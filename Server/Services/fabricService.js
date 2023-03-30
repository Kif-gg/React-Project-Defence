const Fabric = require('../Models/Fabric');
const Review = require('../Models/Review');

const { parseError } = require('../Util/parser');
const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Fabric.find({}).populate('reviews').sort({ price: 1 });

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

async function calcAvgRatingAndTotalReviewsById(fabricId) {
    const product = await Fabric.findById(fabricId).populate('reviews');

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

async function getAllFabrics() {
    const result = await calcAvgRatingAndTotalReviews();
    return result;
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
            return await Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 });
        } else if (direction == 'descending') {
            return await Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 });
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return await Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 });
        } else if (direction == 'descending') {
            return await Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 });
        }
    }
};



module.exports = {
    calcAvgRatingAndTotalReviews,
    calcAvgRatingAndTotalReviewsById,
    getAllFabrics,
    getFabricFiltered
};