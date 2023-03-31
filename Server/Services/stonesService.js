const Stones = require('../Models/Stones');
const Review = require('../Models/Review');
const User = require('../Models/User');

const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Stones.find({}).populate('reviews').sort({ price: 1 });

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

async function calcAvgRatingAndTotalReviewsById(stonesId) {
    const product = await Stones.findById(stonesId).populate('reviews');

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

async function getAllStones() {
    return calcAvgRatingAndTotalReviews();
};

async function getStonesFiltered(search, type, shape, size, color, sort, direction) {

    await calcAvgRatingAndTotalReviews();

    if (type == 'all') {
        type = '';
    }
    if (shape == 'all') {
        shape = '';
    }
    if (size == 'all') {
        size = '';
    }
    if (color == 'all') {
        color = '';
    }

    const query = new RegExp(createRegExp(search), 'i');

    const filter = {};

    filter.stoneType = new RegExp(type, 'i');
    filter.stoneShape = new RegExp(shape, 'i');
    filter.stoneSize = new RegExp(size, 'i');
    filter.stoneColor = new RegExp(color, 'i');

    if (sort == 'price') {
        if (direction == 'ascending') {
            return Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 });
        } else if (direction == 'descending') {
            return Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 });
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 });
        } else if (direction == 'descending') {
            return Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 });
        }
    }
};

async function getStonesById(stonesId) {
    return calcAvgRatingAndTotalReviewsById(stonesId);
}

async function getStonesById(stonesId) {
    return calcAvgRatingAndTotalReviewsById(stonesId);
}

async function addStonesToFavorites(stonesId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingStones = await getStonesById(stonesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        if (existingUser.favorites.stones.includes(stonesId)) {
            return;
        } else {
            existingUser.favorites.stones.unshift(stonesId);
            return existingUser.save();
        }
    }
}

async function removeStonesFromFavorites(stonesId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingStones = await getStonesById(stonesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        if (existingUser.favorites.stones.includes(stonesId)) {
            existingUser.favorites.stones.splice(existingUser.favorites.stones.indexOf(stonesId));
            return existingUser.save();
        } else {
            return;
        }
    }
}

async function getFavoriteStones(userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const arrOfFavoriteStones = [];
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        for (let product of existingUser.favorites.stones) {
            product = await getStonesById(product);
            arrOfFavoriteStones.push(product);
        }
        return arrOfFavoriteStones;
    }
}

async function addStonesToCart(stonesId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingStones = await getStonesById(stonesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        if (existingUser.cart.stones.includes(stonesId)) {
            return;
        } else {
            existingUser.cart.stones.unshift(stonesId);
            return existingUser.save();
        }
    }
}

async function removeStonesFromCart(stonesId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingStones = await getStonesById(stonesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        if (existingUser.cart.stones.includes(stonesId)) {
            existingUser.cart.stones.splice(existingUser.cart.stones.indexOf(stonesId));
            return existingUser.save();
        } else {
            return;
        }
    }
}

async function getStonesInCart(userId) {
    const existingUser = await User.findById(userId).select('cart');
    const arrOfStonesInCart = [];
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        for (let product of existingUser.cart.stones) {
            product = await getStonesById(product);
            arrOfStonesInCart.push(product);
        }
        return arrOfStonesInCart;
    }
}

module.exports = {
    calcAvgRatingAndTotalReviews,
    calcAvgRatingAndTotalReviewsById,
    getAllStones,
    getStonesFiltered,
    getStonesById,
    addStonesToFavorites,
    removeStonesFromFavorites,
    getFavoriteStones,
    addStonesToCart,
    removeStonesFromCart,
    getStonesInCart
};