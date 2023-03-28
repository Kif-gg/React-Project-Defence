const { Schema, model, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String, required: [true, 'Username is required!'], unique: true,
        minLength: [3, 'Username must be at least 3 characters!'],
        maxLength: [20, 'Username must not be longer than 20 characters!']
    },
    email: {
        type: String, required: [true, 'Email is required!'], unique: true, match: [/^([a-z]+)\w{2,20}[@][a-z_-]{3,20}[.][a-z]{2,5}$/i, 'This email is not valid!'],
    },
    number: {
        type: String, required: [true, 'Phone number is required!'], match: [/^(\+359|0)\d{9}$/, 'The phone number is not valid!'],
    },
    hashedPassword: {
        type: String, required: true
    },
    pin: {
        type: String, required: true, default: 'No pin'
    },
    role: {
        type: String, required: true, default: 'user'
    },
    blocked: {
        type: Boolean, required: true, default: false
    },
    favorites: {
        type: [ObjectId], ref: 'Product', default: []
    },
    cart: {
        type: [ObjectId], ref: 'Product', default: []
    }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;