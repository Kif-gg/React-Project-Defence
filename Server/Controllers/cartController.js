const { guestGuard } = require('../Middlewares/guards');
const { removeClothesFromCart } = require('../Services/clothesService');
const { removeFabricFromCart } = require('../Services/fabricService');
const { removeStampFromCart } = require('../Services/stampService');
const { removeStonesFromCart } = require('../Services/stonesService');
const { getUserCart } = require('../Services/userService');
const { parseError } = require('../Util/parser');

const cartController = require('express').Router();

cartController.get('/', guestGuard(), async (req, res) => {
    try {
        const products = await getUserCart(req.user._id);
        res.json(products);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

cartController.delete('/:id', guestGuard(), async (req, res) => {
    try {
        await removeFabricFromCart(req.params.id, req.user._id);
        res.status(204).end();
        return;
    } catch (error) {
        const message = parseError(error);
        if (message.includes('not in your cart') || message.includes('User with ID')) {
            res.json({ message });
            return;
        }
    }
    try {
        await removeStonesFromCart(req.params.id, req.user._id);
        res.status(204).end();
        return;
    } catch (error) {
        const message = parseError(error);
        if (message.includes('not in your cart') || message.includes('User with ID')) {
            res.json({ message });
            return;
        }
    }
    try {
        await removeStampFromCart(req.params.id, req.user._id);
        res.status(204).end();
        return;
    } catch (error) {
        const message = parseError(error);
        if (message.includes('not in your cart') || message.includes('User with ID')) {
            res.json({ message });
            return;
        }
    }
    try {
        await removeClothesFromCart(req.params.id, req.user._id);
        res.status(204).end();
        return;
    } catch (error) {
        const message = parseError(error);
        res.json({ message });
    }
});

module.exports = cartController;