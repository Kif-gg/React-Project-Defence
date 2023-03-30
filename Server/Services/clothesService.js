const Clothes = require('../Models/Clothes');
const Review = require('../Models/Review');

const { parseError } = require('../Util/parser');
const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Clothes.find({}).populate('reviews').sort({ price: 1 });

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

    return collection;
};

async function calcAvgRatingAndTotalReviewsById(stonesId) {
    const product = await Clothes.findById(stonesId).populate('reviews');

    let average = 0;
    for (let review of product.reviews) {
        average += review.rating;
    }
    average = average / product.reviews.length;

    product.average = average;
    product.totalPeople = product.reviews.length;

    await product.save();

    return product;
};

async function getAllClothes() {
    const result = await calcAvgRatingAndTotalReviews();
    return result;
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

    console.log(filter);

    if (sort == 'price') {
        if (direction == 'ascending') {
            return await Clothes.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 });
        } else if (direction == 'descending') {
            return await Clothes.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 });
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return await Clothes.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 });
        } else if (direction == 'descending') {
            return await Clothes.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 });
        }
    }
};



module.exports = {
    calcAvgRatingAndTotalReviews,
    calcAvgRatingAndTotalReviewsById,
    getAllClothes,
    getClothesFiltered
};