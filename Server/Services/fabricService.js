const Fabric = require('../Models/Fabric');
const Review = require('../Models/Review');
const User = require('../Models/User');

const { createRegExp } = require('../Util/regexGenerator');

async function calcAvgRatingAndTotalReviews() {

    const collection = await Fabric.find({}).populate('reviews').sort({ price: 1 });

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

async function calcAvgRatingAndTotalReviewsById(fabricId) {
    const product = await Fabric.findById(fabricId).populate('reviews');

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

async function getAllFabrics() {
    return calcAvgRatingAndTotalReviews();
};

async function getFabricFiltered(search, type, extras, sort, direction) {

    await calcAvgRatingAndTotalReviews();

    if (search == undefined) {
        search = '';
    }
    if (type == 'all' || type == undefined) {
        type = '';
    }
    if (extras == 'all' || extras == undefined) {
        extras = '';
    }
    if (sort == undefined) {
        sort = 'price';
    }
    if (direction == undefined) {
        direction = 'ascending';
    }

    const query = new RegExp(createRegExp(search), 'i');

    const filter = {};

    filter.fabricType = new RegExp(type, 'i');
    filter.extras = new RegExp(extras, 'i');

    if (sort == 'price') {
        if (direction == 'ascending') {
            return Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: 1 }).populate('reviews');
        } else if (direction == 'descending') {
            return Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ price: -1 }).populate('reviews');
        }
    } else if (sort == 'rating') {
        if (direction == 'ascending') {
            return Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: 1 }).populate('reviews');
        } else if (direction == 'descending') {
            return Fabric.find(filter).or([{ 'title': query }, { 'description': query }]).sort({ average: -1 }).populate('reviews');
        }
    }
};

async function getFabricById(fabricId) {
    return calcAvgRatingAndTotalReviewsById(fabricId);
};

async function addFabricToFavorites(fabricId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingFabric = await getFabricById(fabricId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingFabric == false) {
        throw new Error(`A product from this category with ID ${fabricId} does not exist!`);
    } else {
        if (!!existingUser.favorites.fabrics.find(fav => fav.toString() == fabricId) == true) {
            return;
        } else {
            existingUser.favorites.fabrics.unshift(fabricId);
            return existingUser.save();
        }
    }
};

async function removeFabricFromFavorites(fabricId, userId) {
    const existingUser = await User.findById(userId).select('favorites');
    const existingFabric = await getFabricById(fabricId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingFabric == false) {
        throw new Error(`A product from this category with ID ${fabricId} does not exist!`);
    } else {
        if (!!existingUser.favorites.fabrics.find(fav => fav.toString() == fabricId) == true) {
            existingUser.favorites.fabrics.splice(existingUser.favorites.fabrics.findIndex(fav => fav.toString() == fabricId), 1);
            return existingUser.save();
        } else {
            return;
        }
    }
};

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
};

async function addFabricToCart(fabricId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingFabric = await getFabricById(fabricId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingFabric == false) {
        throw new Error(`A product from this category with ID ${fabricId} does not exist!`);
    } else {
        if (!!existingUser.cart.fabrics.find(prod => prod.toString() == fabricId) == true) {
            return;
        } else {
            existingUser.cart.fabrics.unshift(fabricId);
            return existingUser.save();
        }
    }
};

async function removeFabricFromCart(fabricId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingFabric = await getFabricById(fabricId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingFabric == false) {
        throw new Error(`A product from this category with ID ${fabricId} does not exist!`);
    } else {
        if (!!existingUser.cart.fabrics.find(prod => prod.toString() == fabricId) == true) {
            existingUser.cart.fabrics.splice(existingUser.cart.fabrics.findIndex(prod => prod.toString() == fabricId), 1);
            return existingUser.save();
        } else {
            return;
        }
    }
};

async function getFabricsInCart(userId) {
    const existingUser = await User.findById(userId).select('cart');
    const arrOfFabricsInCart = [];
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        for (let product of existingUser.cart.fabrics) {
            product = await getFabricById(product);
            arrOfFabricsInCart.push(product);
        }
        return arrOfFabricsInCart;
    }
};

async function addFabricReview(fabricId, userId, reviewBody) {
    const existingUser = await User.findById(userId);
    const existingFabric = await getFabricById(fabricId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingFabric == false) {
        throw new Error(`A product from this category with ID ${fabricId} does not exist!`);
    } else {
        const review = await Review.create({
            userId: existingUser._id,
            rating: reviewBody.rating,
            comment: reviewBody.comment
        });

        await review.save();

        existingFabric.reviews.unshift(review);

        await existingFabric.save();

        return calcAvgRatingAndTotalReviewsById(fabricId);
    }
};

async function editFabricReview(fabricId, userId, reviewBody) {
    const existingUser = await User.findById(userId);
    const existingFabric = await getFabricById(fabricId);

    const reviewId = document.querySelector('.review-id');

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingFabric == false) {
        throw new Error(`A product from this category with ID ${fabricId} does not exist!`);
    } else {
        const review = await Review.findById(reviewId);

        if (!!review == false) {
            throw new Error(`A review with ID ${reviewId} does not exist!`);
        } else if (review.userId != userId) {
            throw new Error('You can not edit someone else\'s review!');
        } else if (!!existingFabric.reviews.find(review => review._id == reviewId) != true) {
            throw new Error(`Review with ID ${reviewId} does not exist in this product!`);
        } else {

            review.rating = reviewBody.rating;
            review.comment = reviewBody.comment;

            await review.save();

            await existingFabric.save();

            return calcAvgRatingAndTotalReviewsById(fabricId);
        }
    }
};

async function deleteFabricReview(fabricId, userId) {
    const existingUser = await User.findById(userId);
    const existingFabric = await getFabricById(fabricId);

    const reviewId = document.querySelector('.review-id');

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingFabric == false) {
        throw new Error(`A product from this category with ID ${fabricId} does not exist!`);
    } else {
        const review = await Review.findById(reviewId);

        if (!!review == false) {
            throw new Error(`A review with ID ${reviewId} does not exist!`);
        } else if (review.userId != userId) {
            throw new Error('You can not delete someone else\'s review!');
        } else if (!!existingFabric.reviews.find(review => review._id == reviewId) != true) {
            throw new Error(`Review with ID ${reviewId} does not exist in this product!`);
        } else {
            await Review.findByIdAndDelete(reviewId);
            existingFabric.reviews.splice(existingFabric.reviews.findIndex(review => review._id == reviewId), 1);
            return calcAvgRatingAndTotalReviewsById(fabricId);
        }
    }
};

module.exports = {
    calcAvgRatingAndTotalReviews,
    calcAvgRatingAndTotalReviewsById,
    getAllFabrics,
    getFabricFiltered,
    getFabricById,
    addFabricToFavorites,
    removeFabricFromFavorites,
    getFavoriteFabrics,
    addFabricToCart,
    removeFabricFromCart,
    getFabricsInCart,
    addFabricReview,
    editFabricReview,
    deleteFabricReview
};