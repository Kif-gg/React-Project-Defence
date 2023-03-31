const Clothes = require('../Models/Clothes');
const Review = require('../Models/Review');
const User = require('../Models/User');

const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Clothes.find({}).populate('reviews').sort({ price: 1 });

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

async function calcAvgRatingAndTotalReviewsById(clothesId) {
    const product = await Clothes.findById(clothesId).populate('reviews');

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

async function getAllClothes() {
    return calcAvgRatingAndTotalReviews();
};

async function getClothesFiltered(search, type, targets, sort, direction) {

    await calcAvgRatingAndTotalReviews();

    if (type == 'all') {
        type = '';
    }
    if (targets == 'all') {
        targets = '';
    }

    const query = new RegExp(createRegExp(search), 'i');

    const filter = {};

    filter.clothingType = new RegExp(type, 'i');
    filter.targetCustomers = new RegExp(targets, 'i');

    if (sort == 'price') {
        if (direction == 'ascending') {
            return Clothes.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 });
        } else if (direction == 'descending') {
            return Clothes.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 });
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return Clothes.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 });
        } else if (direction == 'descending') {
            return Clothes.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 });
        }
    }
};

async function getClothesById(clothesId) {
    return calcAvgRatingAndTotalReviewsById(clothesId);
}

async function getClothesById(clothesId) {
    return calcAvgRatingAndTotalReviewsById(clothesId);
}

async function addClothesToFavorites(clothesId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingClothes = await getClothesById(clothesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingClothes == false) {
        throw new Error(`A product from this category with ID ${clothesId} does not exist!`);
    } else {
        if (existingUser.favorites.clothes.includes(clothesId)) {
            return;
        } else {
            existingUser.favorites.clothes.unshift(clothesId);
            return existingUser.save();
        }
    }
}

async function removeClothesFromFavorites(clothesId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingClothes = await getClothesById(clothesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingClothes == false) {
        throw new Error(`A product from this category with ID ${clothesId} does not exist!`);
    } else {
        if (existingUser.favorites.clothes.includes(clothesId)) {
            existingUser.favorites.clothes.splice(existingUser.favorites.clothes.indexOf(clothesId));
            return existingUser.save();
        } else {
            return;
        }
    }
}

async function getFavoriteClothes(userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const arrOfFavoriteClothes = [];
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        for (let product of existingUser.favorites.clothes) {
            product = await getClothesById(product);
            arrOfFavoriteClothes.push(product);
        }
        return arrOfFavoriteClothes;
    }
}

module.exports = {
    calcAvgRatingAndTotalReviews,
    calcAvgRatingAndTotalReviewsById,
    getAllClothes,
    getClothesFiltered,
    getClothesById,
    addClothesToFavorites,
    removeClothesFromFavorites,
    getFavoriteClothes
};