const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const connectionString = 'mongodb://127.0.0.1:27017/React-project-defence';

const authController = require('./Controllers/authController');

const trimBody = require('./Middlewares/trimBody');
const session = require('./Middlewares/session');

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
        // TODO add cors if needed

        app.get('/', async (req, res) => {
            res.json({ message: 'REST service is operating' });
        });

        // app.use('/')
        app.use('/users', authController);


        app.listen(3030, () => console.log('REST service started successfully'));
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
};