const { Schema, model, Types: { ObjectId } } = require('mongoose');

const stampSchema = new Schema({
    imageUrl: {
        type: String, required: true, match: [/^http(s)?:\/\/(www|[a-z0-9]{1,3}\.)?[\w-]{3,20}\.[a-z]{2,10}(([\w]{1,300}|[^a-z0-9\s]{1,300}){1,300})?$/i, 'Image URL is not valid!']
    },
    title: {
        type: String, required: true, minLength: [4, 'Title must be at least 4 characters!'], maxLength: [50, 'Title must not be longer than 50 characters!']
    },
    description: {
        type: String, required: true, minLength: [20, 'Description must be at least 20 characters!'], maxLength: [200, 'Description must not be longer than 200 characters!']
    },
    stoneType: {
        type: String, required: [true, 'Stone type is required!']
    },
    stampDesign: {
        type: String, required: [true, 'Stamp shape is required!']
    },
    stoneColor: {
        type: String, required: [true, 'Stone color is required!']
    },
    price: {
        type: Number, required: true, min: [0.1, 'Price must not be negative or 0!']
    },
    availability: {
        type: Boolean, required: true, default: true
    },
    reviews: {
        type: [ObjectId], ref: 'Review', default: []
    },
    average: {
        type: Number, default: 0
    },
    totalPeople: {
        type: Number, default: 0
    }
}, {
    timestamps: { updatedAt: 'updatedAt' }
});

const Stamp = model('Stamp', stampSchema);

module.exports = Stamp;