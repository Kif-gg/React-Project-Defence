const { Schema, model, Types: { ObjectId } } = require('mongoose');

const reviewSchema = new Schema({
    userId: {
        type: ObjectId, ref: 'User', required: true
    },
    username: {
        type: String, required: true
    },
    rating: {
        type: Number, required: [true, 'Rating is required before posting a review!'], min: [1, 'Rating can not be lower than 1!'], max: [5, 'Rating can not be higher than 5!']
    },
    comment: {
        type: String, required: [true, 'Commenting is required before posting a review!'], minLength: [5, 'Comment must be at least 5 characters!'], maxLength: [800, 'Comment must not be more than 800 characters!']
    }
}, { timestamps: { createdAt: 'createdAt' } });

const Review = model('Review', reviewSchema);

module.exports = Review;