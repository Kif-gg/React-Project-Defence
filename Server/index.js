const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const connectionString = 'mongodb://127.0.0.1:27017/React-project-defence';

const homeController = require('./Controllers/homeController');
const authController = require('./Controllers/authController');
const fabricController = require('./Controllers/fabricController');
const stonesController = require('./Controllers/stonesController');
const stampController = require('./Controllers/stampController');
const clothesController = require('./Controllers/clothesController');
const cartController = require('./Controllers/cartController');

const trimBody = require('./Middlewares/trimBody');
const session = require('./Middlewares/session');
const cors = require('./Middlewares/cors');

start();

async function start() {
    try {
        await mongoose.connect(connectionString);
        console.log('Database connected successfully');

        const app = express();

        app.use(express.json());
        app.use(cookieParser());
        app.use(trimBody());
        app.use(session());
        app.use(cors());

        app.all('/REST-TEST/*', (req, res) => {
            res.json({ message: `REST service is operating => Your URL path is ${req.url}` });
        });

        app.use('/', homeController);
        app.use('/users', authController);
        app.use('/fabric', fabricController);
        app.use('/stones', stonesController);
        app.use('/stamps', stampController);
        app.use('/clothes', clothesController);
        app.use('/cart', cartController);

        app.listen(3030, () => console.log('REST service started successfully'));
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
};