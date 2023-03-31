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

async function addClothesToCart(clothesId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingClothes = await getClothesById(clothesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingClothes == false) {
        throw new Error(`A product from this category with ID ${clothesId} does not exist!`);
    } else {
        if (existingUser.cart.clothes.includes(clothesId)) {
            return;
        } else {
            existingUser.cart.clothes.unshift(clothesId);
            return existingUser.save();
        }
    }
}

async function removeClothesFromCart(clothesId, userId) {
    const existingUser = await User.findById(userId).select('cart');
    const existingClothes = await getClothesById(clothesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingClothes == false) {
        throw new Error(`A product from this category with ID ${clothesId} does not exist!`);
    } else {
        if (existingUser.cart.clothes.includes(clothesId)) {
            existingUser.cart.clothes.splice(existingUser.cart.clothes.indexOf(clothesId));
            return existingUser.save();
        } else {
            return;
        }
    }
}

async function getClothesInCart(userId) {
    const existingUser = await User.findById(userId).select('cart');
    const arrOfClothesInCart = [];
    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else {
        for (let product of existingUser.cart.clothes) {
            product = await getClothesById(product);
            arrOfClothesInCart.push(product);
        }
        return arrOfClothesInCart;
    }
}

async function addClothesReview(clothesId, userId, reviewBody) {
    const existingUser = await User.findById(userId);
    const existingClothes = await getClothesById(clothesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingClothes == false) {
        throw new Error(`A product from this category with ID ${clothesId} does not exist!`);
    } else {
        const review = await Review.create({
            userId: existingUser._id,
            rating: reviewBody.rating,
            comment: reviewBody.comment
        });

        await review.save();

        existingClothes.reviews.unshift(review);

        await existingClothes.save();

        return calcAvgRatingAndTotalReviewsById(clothesId);
    }
}

async function editClothesReview(clothesId, userId, reviewId, reviewBody) {
    const existingUser = await User.findById(userId);
    const existingClothes = await getClothesById(clothesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingClothes == false) {
        throw new Error(`A product from this category with ID ${clothesId} does not exist!`);
    } else {
        const review = await Review.findById(reviewId);

        if (!!review == false) {
            throw new Error(`A review with ID ${reviewId} does not exist!`);
        } else if (review.userId != userId) {
            throw new Error('You can not edit someone else\'s review!');
        } else if (!existingClothes.reviews.includes(reviewId)) {
            throw new Error(`Review with ID ${reviewId} does not exist in this product!`);
        } else {

            review.rating = reviewBody.rating;
            review.comment = reviewBody.comment;

            await review.save();

            await existingClothes.save();

            return calcAvgRatingAndTotalReviewsById(clothesId);
        }
    }
}

async function deleteClothesReview(clothesId, userId, reviewId) {
    const existingUser = await User.findById(userId);
    const existingClothes = await getClothesById(clothesId);

    if (!!existingUser == false) {
        throw new Error(`User with ID ${userId} does not exist!`);
    } else if (!!existingClothes == false) {
        throw new Error(`A product from this category with ID ${clothesId} does not exist!`);
    } else {
        const review = await Review.findById(reviewId);

        if (!!review == false) {
            throw new Error(`A review with ID ${reviewId} does not exist!`);
        } else if (review.userId != userId) {
            throw new Error('You can not delete someone else\'s review!');
        } else if (!existingClothes.reviews.includes(reviewId)) {
            throw new Error(`Review with ID ${reviewId} does not exist in this product!`);
        } else {
            return Review.findByIdAndDelete(reviewId);
        }
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
    getFavoriteClothes,
    addClothesToCart,
    removeClothesFromCart,
    getClothesInCart,
    addClothesReview,
    editClothesReview,
    deleteClothesReview
};