const Stones = require('../Models/Stones');
const Review = require('../Models/Review');
const User = require('../Models/User');

const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Stones.find({}).populate('reviews').sort({ price: 1 });

    if (collection.length > 0) {
        for (let product of collection) {
            let average = 0;
            if (product.reviews.length > 0) {
                for (let review of product.reviews) {
                    average += review.rating;
                }
                average = average / product.reviews.length;

                product.average = Number(average.toFixed(1));
            } else {
                product.average = 0;
            }
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
        if (product.reviews.length > 0) {
            for (let review of product.reviews) {
                average += review.rating;
            }
            average = average / product.reviews.length;

            product.average = Number(average.toFixed(1));
        } else {
            product.average = 0;
        }
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

    if (search == undefined) {
        search = '';
    }
    if (type == 'all' || type == undefined) {
        type = '';
    }
    if (shape == 'all' || shape == undefined) {
        shape = '';
    }
    if (size == 'all' || size == undefined) {
        size = '';
    }
    if (color == 'all' || color == undefined) {
        color = '';
    }
    if (sort == undefined) {
        sort = 'price';
    }
    if (direction == undefined) {
        direction = 'ascending';
    }

    const query = new RegExp(createRegExp(search), 'i');

    const filter = {};

    filter.stoneType = new RegExp(type, 'i');
    filter.stoneShape = new RegExp(shape, 'i');
    filter.stoneSize = new RegExp(size, 'i');
    filter.stoneColor = new RegExp(color, 'i');

    if (sort == 'price') {
        if (direction == 'ascending') {
            return Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 }).populate('reviews');
        } else if (direction == 'descending') {
            return Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 }).populate('reviews');
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 }).populate('reviews');
        } else if (direction == 'descending') {
            return Stones.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 }).populate('reviews');
        }
    }
};

async function getStonesById(stonesId) {
    return calcAvgRatingAndTotalReviewsById(stonesId);
};

async function getStonesById(stonesId) {
    return calcAvgRatingAndTotalReviewsById(stonesId);
};

async function addStonesToFavorites(stonesId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingStones = await getStonesById(stonesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        if (!!existingUser.favorites.stones.find(fav => fav.toString() == stonesId) == true) {
            return;
        } else {
            existingUser.favorites.stones.unshift(stonesId);
            return existingUser.save();
        }
    }
};

async function removeStonesFromFavorites(stonesId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingStones = await getStonesById(stonesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        if (!!existingUser.favorites.stones.find(fav => fav.toString() == stonesId) == true) {
            existingUser.favorites.stones.splice(existingUser.favorites.stones.findIndex(fav => fav.toString() == stonesId), 1);
            return existingUser.save();
        } else {
            return;
        }
    }
};

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
};

async function addStonesToCart(stonesId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingStones = await getStonesById(stonesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        if (!!existingUser.cart.stones.find(prod => prod.toString() == stonesId) == true) {
            return;
        } else {
            existingUser.cart.stones.unshift(stonesId);
            return existingUser.save();
        }
    }
};

async function removeStonesFromCart(stonesId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingStones = await getStonesById(stonesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        if (!!existingUser.cart.stones.find(prod => prod.toString() == stonesId) == true) {
            existingUser.cart.stones.splice(existingUser.cart.stones.findIndex(prod => prod.toString() == stonesId), 1);
            return existingUser.save();
        } else {
            return;
        }
    }
};

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
};

async function addStonesReview(stonesId, userId, reviewBody) {
    const existingUser = await User.findById(userId);
    const existingStones = await getStonesById(stonesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        const review = await Review.create({
            userId: existingUser._id,
            rating: reviewBody.rating,
            comment: reviewBody.comment
        });

        await review.save();

        existingStones.reviews.unshift(review);

        await existingStones.save();

        return calcAvgRatingAndTotalReviewsById(stonesId);
    }
};

async function editStonesReview(stonesId, userId, reviewBody) {
    const existingUser = await User.findById(userId);
    const existingStones = await getStonesById(stonesId);
    
    const reviewId = document.querySelector('.review-id').textContent;

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        const review = await Review.findById(reviewId);

        if (!!review == false) {
            throw new Error(`A review with ID ${reviewId} does not exist!`);
        } else if (review.userId != userId) {
            throw new Error('You can not edit someone else\'s review!');
        } else if (!!existingStones.reviews.find(review => review._id == reviewId) != true) {
            throw new Error(`Review with ID ${reviewId} does not exist in this product!`);
        } else {

            review.rating = reviewBody.rating;
            review.comment = reviewBody.comment;

            await review.save();

            await existingStones.save();

            return calcAvgRatingAndTotalReviewsById(stonesId);
        }
    }
};

async function deleteStonesReview(stonesId, userId) {
    const existingUser = await User.findById(userId);
    const existingStones = await getStonesById(stonesId);

    const reviewId = document.querySelector('.review-id').textContent;

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStones == false) {
        throw new Error(`A product from this category with ID ${stonesId} does not exist!`);
    } else {
        const review = await Review.findById(reviewId);

        if (!!review == false) {
            throw new Error(`A review with ID ${reviewId} does not exist!`);
        } else if (review.userId != userId) {
            throw new Error('You can not delete someone else\'s review!');
        } else if (!!existingStones.reviews.find(review => review._id == reviewId) != true) {
            throw new Error(`Review with ID ${reviewId} does not exist in this product!`);
        } else {
            await Review.findByIdAndDelete(reviewId);
            existingStones.reviews.splice(existingStones.reviews.findIndex(review => review._id == reviewId), 1);
            return calcAvgRatingAndTotalReviewsById(stonesId);
        }
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
    getStonesInCart,
    addStonesReview,
    editStonesReview,
    deleteStonesReview
};