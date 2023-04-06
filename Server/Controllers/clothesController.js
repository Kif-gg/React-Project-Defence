const { guestGuard } = require('../Middlewares/guards');
const { getAllClothes, getClothesFiltered, getClothesById, addClothesReview, editClothesReview, deleteClothesReview, addClothesToFavorites, removeClothesFromFavorites, addClothesToCart, removeClothesFromCart } = require('../Services/clothesService');
const { parseError } = require('../Util/parser');

const clothesController = require('express').Router();

clothesController.get('/', async (req, res) => {
    try {
        let result = {};
        if (Object.keys(req.query) == 0) {
            result = await getAllClothes();
        } else {
            result = await getClothesFiltered(req.query.search, req.query['clothes-type'], req.query['target-customers'], req.query.sort, req.query.direction);
        }
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

clothesController.get('/:id', async (req, res) => {
    try {
        const result = await getClothesById(req.params.id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

clothesController.post('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await addClothesReview(req.params.id, req.user._id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

clothesController.put('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await editClothesReview(req.params.id, req.user._id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

clothesController.delete('/:id', guestGuard(), async (req, res) => {
    try {
        const result = await deleteClothesReview(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

clothesController.post('/:id/favorite', guestGuard(), async (req, res) => {
    try {
        const result = await addClothesToFavorites(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

clothesController.delete('/:id/favorite', guestGuard(), async (req, res) => {
    try {
        await removeClothesFromFavorites(req.params.id, req.user._id);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

clothesController.post('/:id/cart', guestGuard(), async (req, res) => {
    try {
        const result = await addClothesToCart(req.params.id, req.user._id);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = clothesController;