const Fabric = require('../Models/Fabric');
const Review = require('../Models/Review');
const User = require('../Models/User');

const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Fabric.find({}).populate('reviews').sort({ price: 1 });

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

async function calcAvgRatingAndTotalReviewsById(fabricId) {
    const product = await Fabric.findById(fabricId).populate('reviews');

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

async function getAllFabrics() {
    return calcAvgRatingAndTotalReviews();
};

async function getFabricFiltered(search, type, extras, sort, direction) {

    await calcAvgRatingAndTotalReviews();

    if (type == 'all') {
        type = '';
    }

    const query = new RegExp(createRegExp(search), 'i');

    const filter = {};

    filter.fabricType = new RegExp(type, 'i');
    filter.extras = new RegExp(extras, 'i');

    if (sort == 'price') {
        if (direction == 'ascending') {
            return Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 });
        } else if (direction == 'descending') {
            return Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 });
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 });
        } else if (direction == 'descending') {
            return Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 });
        }
    }
};

async function getFabricById(fabricId) {
    return calcAvgRatingAndTotalReviewsById(fabricId);
}

async function addFabricToFavorites(fabricId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingFabric = await getFabricById(fabricId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingFabric == false) {
        throw new Error(`A product from this category with ID ${fabricId} does not exist!`);
    } else {
        if (existingUser.favorites.fabrics.includes(fabricId)) {
            return;
        } else {
            existingUser.favorites.fabrics.unshift(fabricId);
            return existingUser.save();
        }
    }
}

async function removeFabricFromFavorites(fabricId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingFabric = await getFabricById(fabricId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingFabric == false) {
        throw new Error(`A product from this category with ID ${fabricId} does not exist!`);
    } else {
        if (existingUser.favorites.fabrics.includes(fabricId)) {
            existingUser.favorites.fabrics.splice(existingUser.favorites.fabrics.indexOf(fabricId));
            return existingUser.save();
        } else {
            return;
        }
    }
}

async function getFavoriteFabrics(userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const arrOfFavoriteFabrics = [];
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        for (let product of existingUser.favorites.fabrics) {
            product = await getFabricById(product);
            arrOfFavoriteFabrics.push(product);
        }
        return arrOfFavoriteFabrics;
    }
}

module.exports = {
    calcAvgRatingAndTotalReviews,
    calcAvgRatingAndTotalReviewsById,
    getAllFabrics,
    getFabricFiltered,
    getFabricById,
    addFabricToFavorites,
    removeFabricFromFavorites,
    getFavoriteFabrics
};