const { guestGuard } = require('../Middlewares/guards');
const { getAllStamps, getStampsFiltered, getStampById, addStampReview, editStampReview, deleteStampReview, addStampToFavorites, removeStampFromFavorites, addStampToCart, removeStampFromCart } = require('../Services/stampService');
const { parseError } = require('../Util/parser');

const stampController = require('express').Router();

stampController.get('/', async (req, res) => {
    try {
        let result = {};
        if (Object.keys(req.query) == 0) {
            result = await getAllStamps();
        } else {
            result = await getStampsFiltered(req.query.search, req.query['clothes-type'], req.query['target-customers'], req.query.sort, req.query.direction);
        }
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stampController.get('/:id', async (req, res) => {
    try {
        const result = await getStampById(req.params.id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stampController.post('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await addStampReview(req.params.id, req.user._id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stampController.put('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await editStampReview(req.params.id, req.user._id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stampController.delete('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await deleteStampReview(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stampController.post('/:id/favorite', guestGuard(), async (req, res) => {
    try {
        const result = await addStampToFavorites(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stampController.delete('/:id/favorite', guestGuard(), async (req, res) => {
    try {
        await removeStampFromFavorites(req.params.id, req.user._id);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stampController.post('/:id/cart', guestGuard(), async (req, res) => {
    try {
        const result = await addStampToCart(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = stampController;