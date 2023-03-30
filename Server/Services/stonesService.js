const Stones = require('../Models/Stones');
const Review = require('../Models/Review');

const { parseError } = require('../Util/parser');
const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Stones.find({}).populate('reviews').sort({ price: 1 });

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
    const product = await Stones.findById(stonesId).populate('reviews');

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

async function getAllStones() {
    const result = await calcAvgRatingAndTotalReviews();
    return result;
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

    console.log(filter);

    if (sort == 'price') {
        if (direction == 'ascending') {
            return await Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 });
        } else if (direction == 'descending') {
            return await Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 });
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return await Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 });
        } else if (direction == 'descending') {
            return await Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 });
        }
    }
};



module.exports = {
    calcAvgRatingAndTotalReviews,
    calcAvgRatingAndTotalReviewsById,
    getAllStones,
    getStonesFiltered
};