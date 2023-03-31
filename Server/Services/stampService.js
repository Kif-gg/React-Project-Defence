const Stamp = require('../Models/Stamp');
const Review = require('../Models/Review');
const User = require('../Models/User');

const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Stamp.find({}).populate('reviews').sort({ price: 1 });

    if (collection.length > 0) {
        for (let product of collection) {
            let average = 0;
            for (let review of product.reviews) {
                average += review.rating;
            }
            average = average / product.reviews.length;

            product.average = average;
            product.totalPeople = product.reviews.length;

            await product.save();
        }
    }
    return collection;
};

async function calcAvgRatingAndTotalReviewsById(stampId) {
    const product = await Stamp.findById(stampId).populate('reviews');

    if (!!product != false) {
        let average = 0;
        for (let review of product.reviews) {
            average += review.rating;
        }
        average = average / product.reviews.length;

        product.average = average;
        product.totalPeople = product.reviews.length;

        await product.save();
    }
    return product;
};

async function getAllStamps() {
    return calcAvgRatingAndTotalReviews();
};

async function getStampsFiltered(search, type, design, color, sort, direction) {

    await calcAvgRatingAndTotalReviews();

    if (type == 'all') {
        type = '';
    }
    if (design == 'all') {
        design = '';
    }
    if (color == 'all') {
        color = '';
    }

    const query = new RegExp(createRegExp(search), 'i');

    const filter = {};

    filter.stoneType = new RegExp(type, 'i');
    filter.stampDesign = new RegExp(design, 'i');
    filter.stoneColor = new RegExp(color, 'i');

    if (sort == 'price') {
        if (direction == 'ascending') {
            return Stamp.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 });
        } else if (direction == 'descending') {
            return Stamp.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 });
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return Stamp.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 });
        } else if (direction == 'descending') {
            return Stamp.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 });
        }
    }
};

async function getStampById(stampId) {
    return calcAvgRatingAndTotalReviewsById(stampId);
}

async function addStampToFavorites(stampId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingStamp = await getStampById(stampId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else {
        if (existingUser.favorites.stamps.includes(stampId)) {
            return;
        } else {
            existingUser.favorites.stamps.unshift(stampId);
            return existingUser.save();
        }
    }
}

async function removeStampFromFavorites(stampId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingStamp = await getStampById(stampId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else {
        if (existingUser.favorites.stamps.includes(stampId)) {
            existingUser.favorites.stamps.splice(existingUser.favorites.stamps.indexOf(stampId));
            return existingUser.save();
        } else {
            return;
        }
    }
}

async function getFavoriteStamps(userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const arrOfFavoriteStamps = [];
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        for (let product of existingUser.favorites.stamps) {
            product = await getStampById(product);
            arrOfFavoriteStamps.push(product);
        }
        return arrOfFavoriteStamps;
    }
}

async function addStampToCart(stampId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingStamp = await getStampById(stampId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else {
        if (existingUser.cart.stamps.includes(stampId)) {
            return;
        } else {
            existingUser.cart.stamps.unshift(stampId);
            return existingUser.save();
        }
    }
}

async function removeStampFromCart(stampId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingStamp = await getStampById(stampId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else {
        if (existingUser.cart.stamps.includes(stampId)) {
            existingUser.cart.stamps.splice(existingUser.cart.stamps.indexOf(stampId));
            return existingUser.save();
        } else {
            return;
        }
    }
}

async function getStampsInCart(userId) {
    const existingUser = await User.findById(userId).select('cart');
    const arrOfStampsInCart = [];
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        for (let product of existingUser.cart.stamps) {
            product = await getFabricById(product);
            arrOfStampsInCart.push(product);
        }
        return arrOfStampsInCart;
    }
}

module.exports = {
    calcAvgRatingAndTotalReviews,
    calcAvgRatingAndTotalReviewsById,
    getAllStamps,
    getStampsFiltered,
    getStampById,
    addStampToFavorites,
    removeStampFromFavorites,
    getFavoriteStamps,
    addStampToCart,
    removeStampFromCart,
    getStampsInCart
};