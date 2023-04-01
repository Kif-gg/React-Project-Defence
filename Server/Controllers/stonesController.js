const { guestGuard } = require('../Middlewares/guards');
const { getAllStones, getStonesFiltered, addStonesReview, editStonesReview, deleteStonesReview, addStonesToFavorites, removeStonesFromFavorites, addStonesToCart, removeStonesFromCart } = require('../Services/stonesService');
const { parseError } = require('../Util/parser');

const stonesController = require('express').Router();

stonesController.get('/', async (req, res) => {
    try {
        let result = {};
        if (Object.keys(req.query) == 0) {
            result = await getAllStones();
        } else {
            result = await getStonesFiltered(req.query.search, req.query['stone-type'], req.query['stone-shape'], req.query['stone-size'], req.query['stone-color'], req.query.sort, req.query.direction);
        }
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stonesController.get('/:id', async (req, res) => {
    try {
        const result = await getStonesById(req.params.id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stonesController.post('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await addStonesReview(req.params.id, req.user._id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stonesController.put('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await editStonesReview(req.params.id, req.user._id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stonesController.delete('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await deleteStonesReview(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stonesController.post('/:id/favorite', guestGuard(), async (req, res) => {
    try {
        const result = await addStonesToFavorites(req.params.id, req.user._id);
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stonesController.delete('/:id/favorite', guestGuard(), async (req, res) => {
    try {
        const result = await removeStonesFromFavorites(req.params.id, req.user._id);
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stonesController.post('/:id/cart', guestGuard(), async (req, res) => {
    try {
        const result = await addStonesToCart(req.params.id, req.user._id);
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

stonesController.delete('/:id/cart', guestGuard(), async (req, res) => {
    try {
        const result = await removeStonesFromCart(req.params.id, req.user._id);
        res.json(result)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = stonesController;