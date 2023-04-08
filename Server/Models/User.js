const { Schema, model, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String, required: [true, 'Username is required!'], unique: true,
        minLength: [3, 'Username must be at least 3 characters!'],
        maxLength: [20, 'Username must not be longer than 20 characters!'],
        match: [/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/i, 'This username is not valid!']
    },
    email: {
        type: String, required: [true, 'Email is required!'], unique: true, match: [/^([a-z]+)\w{2,20}[@][a-z_-]{3,20}[.][a-z]{2,5}$/i, 'This email is not valid!'],
    },
    number: {
        type: String, required: [true, 'Phone number is required!'], match: [/^(\+359|0)\d{9}$/, 'The phone number is not valid!'],
    },
    hashedPassword: {
        type: String, required: [true, 'Password is required!']
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
        fabrics: { type: [ObjectId], ref: 'Fabric', default: [] },
        stones: { type: [ObjectId], ref: 'Stones', default: [] },
        stamps: { type: [ObjectId], ref: 'Stamp', default: [] },
        clothes: { type: [ObjectId], ref: 'clothes', default: [] },
    },
    cart: {
        fabrics: { type: [ObjectId], ref: 'Fabric', default: [] },
        stones: { type: [ObjectId], ref: 'Stones', default: [] },
        stamps: { type: [ObjectId], ref: 'Stamp', default: [] },
        clothes: { type: [ObjectId], ref: 'clothes', default: [] },
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