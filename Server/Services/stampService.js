const Stamp = require('../Models/Stamp');
const Review = require('../Models/Review');
const User = require('../Models/User');

const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Stamp.find({}).populate('reviews').sort({ price: 1 });

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

async function calcAvgRatingAndTotalReviewsById(stampId) {
    const product = await Stamp.findById(stampId).populate('reviews');

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

async function getAllStamps() {
    return calcAvgRatingAndTotalReviews();
};

async function getStampsFiltered(search, type, design, color, sort, direction) {

    await calcAvgRatingAndTotalReviews();

    if (search == undefined) {
        search = '';
    }
    if (type == 'all' || type == undefined) {
        type = '';
    }
    if (design == 'all' || design == undefined) {
        design = '';
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
    filter.stampDesign = new RegExp(design, 'i');
    filter.stoneColor = new RegExp(color, 'i');

    if (sort == 'price') {
        if (direction == 'ascending') {
            return Stamp.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 }).populate('reviews');
        } else if (direction == 'descending') {
            return Stamp.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 }).populate('reviews');
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return Stamp.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 }).populate('reviews');
        } else if (direction == 'descending') {
            return Stamp.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 }).populate('reviews');
        }
    }
};

async function getStampById(stampId) {
    return calcAvgRatingAndTotalReviewsById(stampId);
};

async function addStampToFavorites(stampId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingStamp = await getStampById(stampId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else {
        if (!!existingUser.favorites.stamps.find(fav => fav.toString() == stampId) == true) {
            throw new Error('This product is already in your favorites list!');
        } else {
            existingUser.favorites.stamps.unshift(stampId);
            return existingUser.save();
        }
    }
};

async function removeStampFromFavorites(stampId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingStamp = await getStampById(stampId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else {
        if (!!existingUser.favorites.stamps.find(fav => fav.toString() == stampId) == true) {
            existingUser.favorites.stamps.splice(existingUser.favorites.stamps.findIndex(fav => fav.toString() == stampId), 1);
            return existingUser.save();
        } else {
            throw new Error('This product is not in your favorites list!');
        }
    }
};

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
};

async function addStampToCart(stampId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingStamp = await getStampById(stampId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else {
        if (!!existingUser.cart.stamps.find(prod => prod.toString() == stampId) == true) {
            throw new Error('This product is already in your cart!');
        } else {
            existingUser.cart.stamps.unshift(stampId);
            return existingUser.save();
        }
    }
};

async function removeStampFromCart(stampId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingStamp = await getStampById(stampId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else {
        if (!!existingUser.cart.stamps.find(prod => prod.toString() == stampId) == true) {
            existingUser.cart.stamps.splice(existingUser.cart.stamps.findIndex(prod => prod.toString() == stampId), 1);
            return existingUser.save();
        } else {
            throw new Error('This product is not in your cart!');
        }
    }
};

async function getStampsInCart(userId) {
    const existingUser = await User.findById(userId).select('cart');
    const arrOfStampsInCart = [];
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        for (let product of existingUser.cart.stamps) {
            product = await getStampById(product);
            arrOfStampsInCart.push(product);
        }
        return arrOfStampsInCart;
    }
};

async function addStampReview(stampId, userId, reviewBody) {
    const existingUser = await User.findById(userId);
    const existingStamp = await getStampById(stampId);
    const existingReview = existingStamp.reviews.find(review => review.userId == existingUser._id.toString());

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else if (!!existingReview == true) {
        throw new Error('You can only post one review per product!');
    } else {
        const review = await Review.create({
            userId: userId,
            rating: reviewBody.rating,
            comment: reviewBody.comment
        });

        await review.save();

        existingStamp.reviews.unshift(review);

        await existingStamp.save();

        return calcAvgRatingAndTotalReviewsById(stampId);
    }
};

async function editStampReview(stampId, userId, reviewBody) {
    const existingUser = await User.findById(userId);
    const existingStamp = await getStampById(stampId);
    const existingReview = existingStamp.reviews.find(review => review.userId == existingUser._id.toString());

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else if (!!existingReview == false) {
        throw new Error('There is no review of this product posted by you to edit!');
    } else if (!!existingReview == false) {
        throw new Error(`Review with ID ${existingReview._id} does not exist in this product!`);
    } else {
        if (existingReview.rating != reviewBody.rating || existingReview.comment != reviewBody.comment) {
            existingReview.rating = reviewBody.rating;
            existingReview.comment = reviewBody.comment;

            await existingReview.save();
            await existingStamp.save();

            return calcAvgRatingAndTotalReviewsById(stampId);
        }
        return;
    }
};

async function deleteStampReview(stampId, userId) {
    const existingUser = await User.findById(userId);
    const existingStamp = await getStampById(stampId);
    const existingReview = existingStamp.reviews.find(review => review.userId == existingUser._id.toString());

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingStamp == false) {
        throw new Error(`A product from this category with ID ${stampId} does not exist!`);
    } else if (!!existingReview == false) {
        throw new Error('There is no review of this product posted by you to delete!');
    } else if (!!existingReview == false) {
        throw new Error(`Review with ID ${existingReview._id} does not exist in this product!`);
    } else {
        await Review.findByIdAndDelete(existingReview._id);

        existingStamp.reviews.splice(existingStamp.reviews.findIndex(review => review._id == existingReview._id), 1);

        existingStamp.save();

        return calcAvgRatingAndTotalReviewsById(stampId);
    }
};

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
    getStampsInCart,
    addStampReview,
    editStampReview,
    deleteStampReview
};