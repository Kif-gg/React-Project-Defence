const { getThreeFromTopRated } = require('../Services/allProductsService');
const { parseError } = require('../Util/parser');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    try {
        const result = await getThreeFromTopRated();
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = homeController;