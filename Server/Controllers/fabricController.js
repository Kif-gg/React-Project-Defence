const { guestGuard } = require('../Middlewares/guards');
const { getAllFabrics, getFabricFiltered, getFabricById, addFabricReview, editFabricReview, deleteFabricReview, addFabricToFavorites, removeFabricFromFavorites, addFabricToCart, removeFabricFromCart } = require('../Services/fabricService');
const { parseError } = require('../Util/parser');

const fabricController = require('express').Router();

fabricController.get('/', async (req, res) => {
    try {
        let result = {};
        if (Object.keys(req.query) == 0) {
            result = await getAllFabrics();
        } else {
            result = await getFabricFiltered(req.query.search, req.query['fabric-type'], req.query.extras, req.query.sort, req.query.direction);
        }
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

fabricController.get('/:id', async (req, res) => {
    try {
        const result = await getFabricById(req.params.id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

fabricController.post('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await addFabricReview(req.params.id, req.user._id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

fabricController.put('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await editFabricReview(req.params.id, req.user._id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

fabricController.delete('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await deleteFabricReview(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

fabricController.post('/:id/favorite', guestGuard(), async (req, res) => {
    try {
        const result = await addFabricToFavorites(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

fabricController.delete('/:id/favorite', guestGuard(), async (req, res) => {
    try {
        await removeFabricFromFavorites(req.params.id, req.user._id);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

fabricController.post('/:id/cart', guestGuard(), async (req, res) => {
    try {
        const result = await addFabricToCart(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = fabricController;