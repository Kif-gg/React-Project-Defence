const { removeClothesFromCart } = require('../Services/clothesService');
const { removeFabricFromCart } = require('../Services/fabricService');
const { removeStampFromCart } = require('../Services/stampService');
const { removeStonesFromCart } = require('../Services/stonesService');
const { getUserCart } = require('../Services/userService');
const { parseError } = require('../Util/parser');

const cartController = require('express').Router();

cartController.get('/', async (req, res) => {
    try {
        const products = await getUserCart(req.user._id);
        res.json(products);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

cartController.delete('/:id', async (req, res) => {
    try {
        const result = await removeFabricFromCart(req.params.id, req.user._id);
        res.json(result);
        return;
    } catch (error) {
        const message = parseError(error);
        if (message.includes('not in your cart') || message.includes('User with ID')) {
            res.json({ message });
            return;
        }
    }
    try {
        const result = await removeStonesFromCart(req.params.id, req.user._id);
        res.json(result);
        return;
    } catch (error) {
        const message = parseError(error);
        if (message.includes('not in your cart') || message.includes('User with ID')) {
            res.json({ message });
            return;
        }
    }
    try {
        const result = await removeStampFromCart(req.params.id, req.user._id);
        res.json(result);
        return;
    } catch (error) {
        const message = parseError(error);
        if (message.includes('not in your cart') || message.includes('User with ID')) {
            res.json({ message });
            return;
        }
    }
    try {
        const result = await removeClothesFromCart(req.params.id, req.user._id);
        res.json(result);
        return;
    } catch (error) {
        const message = parseError(error);
        res.json({ message });
    }
});

module.exports = cartController;