const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const connectionString = 'mongodb://127.0.0.1:27017/React-project-defence';

const authController = require('./Controllers/authController');

start();

async function start() {
    try {
        await mongoose.connect(connectionString);
        console.log('Database connected successfully');

        const app = express();

        app.use(express.json());
        app.use(cookieParser());
        // TODO add the custom middlewares and the controllers

        app.get('/', (req, res) => {
            res.json({ message: 'REST service is operating' });
        });

        app.use('/users', authController)

        app.listen(3030, () => console.log('REST service started successfully'));
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
};