const User = require('../Models/User');
const BlacklistedToken = require('../Models/BlacklistedToken');

const { parseError } = require('../Util/parser');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getFavoriteFabrics, getFabricsInCart } = require('./fabricService');
const { getFavoriteStones, getStonesInCart } = require('./stonesService');
const { getFavoriteStamps, getStampsInCart } = require('./stampService');
const { getFavoriteClothes, getClothesInCart } = require('./clothesService');

const secret = 'VtPkYbhk57BlCbsggaRk2qxFr71rGva4WzPkvpXv';
let wrongPasswordUntilBlock = 10;

async function register(username, email, password, repass, number) {
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existingUsername) {
        throw new Error('This username is already taken!');
    } else if (existingEmail) {
        throw new Error('This email is already registered!');
    } else if (password == '' || password.length < 5) {
        throw new Error('Password is too short!');
    } else if (repass != password) {
        throw new Error('Passwords don\'t match!');
    } else if (number == '' || number.length < 10 || number.length > 13) {
        throw new Error('Phone number is not valid!');
    } else {
        const user = await User.create({
            username,
            email,
            hashedPassword: await bcrypt.hash(password, 10),
            number
        });

        return createToken(user);
    }

};

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (wrongPasswordUntilBlock <= 0) {
        user.blocked = true;
        user.save();
        wrongPasswordUntilBlock = 10;
    }

    if (!user) {
        throw new Error('Incorrect username or password!');
    } else if (user.blocked == true) {
        throw new Error('This profile is blocked! Contact us via email for more details.');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        wrongPasswordUntilBlock--;
        throw new Error('Incorrect username or password!');
    } else if (user.blocked == true) {
        throw new Error('This profile is blocked! Contact us via email for more details.');
    } else {
        wrongPasswordUntilBlock = 10;
        return createToken(user);
    }
};

async function logout(token) {
    await BlacklistedToken.create({ token });
}

async function changeUserData(id, user) {
    const existingUser = await User.findById(id);

    const currentEmail = new RegExp(`^${existingUser.email}$`, 'i');
    const currentNumber = new RegExp(`^(\\+359|0)${existingUser.number.slice(existingUser.number.length - 9)}$`, 'i');

    if (currentEmail.test(user.email) == true && currentNumber.test(user.number) == true) {
        throw new Error('You must change at least one field!');
    } else if (!!await User.findOne({ email: { '$regex': `^${user.email}$`, '$options': 'i' }, _id: existingUser._id }) != true) {
        throw new Error("This email is already registered!");
    }

    existingUser.email = user.email;
    existingUser.number = user.number;

    return existingUser.save();
}

async function changePassword(id, user) {
    const existingUser = await User.findById(id);

    const match = await bcrypt.compare(user.current, existingUser.hashedPassword);

    if (!match) {
        throw new Error('Wrong password!');
    } else if (user.current == user.new) {
        throw new Error('New password can\'t be your current password!');
    } else if (user.new.length < 5) {
        throw new Error('Password is too short!');
    } else {
        existingUser.hashedPassword = await bcrypt.hash(user.new, 10);

        return existingUser.save();
    }
};

async function deleteUser(id, body) {
    const existingUser = await User.findById(id);

    const match = await bcrypt.compare(body.password, existingUser.hashedPassword);

    if (!match) {
        throw new Error('Wrong password!');
    }

    return User.findByIdAndDelete(id);
};

function createToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1d' });

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
    };
};

async function parseToken(token) {
    try {
        const match = await BlacklistedToken.find({ token: token });

        if (match.length > 0) {
            throw new Error('Token is in blacklist!')
        } else {
            return jwt.verify(token, secret);
        }
    } catch (error) {
        const parsed = parseError(error);
        throw new Error(parsed);
    };
};

async function getUserById(userId) {
    return User.findById(userId);
}

async function getUserFavorites(userId) {
    const existingUser = await getUserById(userId);
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        const allFavoritesArray = [];

        const fabricsFavorites = await getFavoriteFabrics(userId);
        const stonesFavorites = await getFavoriteStones(userId);
        const stampsFavorites = await getFavoriteStamps(userId);
        const clothesFavorites = await getFavoriteClothes(userId);

        allFavoritesArray.push(...fabricsFavorites);
        allFavoritesArray.push(...stonesFavorites);
        allFavoritesArray.push(...stampsFavorites);
        allFavoritesArray.push(...clothesFavorites);

        return allFavoritesArray.filter(fav => fav != '');
    }
}

async function getUserCart(userId) {
    const existingUser = await getUserById(userId);
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        const allProductsInCartArray = [];

        const fabricsInCart = await getFabricsInCart(userId);
        const stonesInCart = await getStonesInCart(userId);
        const stampsInCart = await getStampsInCart(userId);
        const clothesInCart = await getClothesInCart(userId);

        allProductsInCartArray.push(...fabricsInCart);
        allProductsInCartArray.push(...stonesInCart);
        allProductsInCartArray.push(...stampsInCart);
        allProductsInCartArray.push(...clothesInCart);

        return allProductsInCartArray.filter(fav => fav != '');
    }
}

module.exports = {
    register,
    login,
    logout,
    parseToken,
    changeUserData,
    changePassword,
    deleteUser,
    getUserById,
    getUserFavorites,
    getUserCart,
    secret
};