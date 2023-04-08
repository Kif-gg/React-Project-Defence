const { isValidObjectId } = require('mongoose');
const { guestGuard } = require('../Middlewares/guards');
const { removeClothesFromCart } = require('../Services/clothesService');
const { removeFabricFromCart } = require('../Services/fabricService');
const { removeStampFromCart } = require('../Services/stampService');
const { removeStonesFromCart } = require('../Services/stonesService');
const { getUserCart, checkoutAndBuy } = require('../Services/userService');
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
        if (isValidObjectId(req.params.id)) {
            await removeFabricFromCart(req.params.id, req.user._id);
            const result = await getUserCart(req.user._id);
            res.json(result);
            return;
        } else {
            res.status(404).json({ message: 'Resource not found!' });
        }
    } catch (error) {
        const message = parseError(error);
        if (message.includes('not in your cart') || message.includes('User with ID')) {
            res.json({ message });
            return;
        }
    }
    try {
        await removeStonesFromCart(req.params.id, req.user._id);
        const result = await getUserCart(req.user._id);
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
        await removeStampFromCart(req.params.id, req.user._id);
        const result = await getUserCart(req.user._id);
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
        await removeClothesFromCart(req.params.id, req.user._id);
        const result = await getUserCart(req.user._id);
        res.json(result);
        return;
    } catch (error) {
        const message = parseError(error);
        res.json({ message });
    }
});

cartController.get('/checkout', async (req, res) => {
    try {
        await checkoutAndBuy(req.user._id);
        res.status(204).send();
    } catch (error) {
        const message = parseError(error);
        res.json({ message });
    }
});

module.exports = cartController;