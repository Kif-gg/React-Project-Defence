const { register, login, logout, changeUserData, changePassword, deleteUser } = require('../Services/userService');
const { parseError } = require('../Util/parser');
const { guestGuard, userGuard } = require('../Middlewares/guards');
const User = require('../Models/User');

const { body, validationResult } = require('express-validator');

const authController = require('express').Router();

authController.post('/register', userGuard(),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters!'),
    body('username').isLength({ max: 20 }).withMessage('Username must not be longer than 20 characters!'),
    body('email').isEmail().withMessage('This email is not valid!'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const token = await register(req.body.username, req.body.email, req.body.password, req.body.repass, req.body.number);
            res.cookie('Authorization', token.accessToken, { httpOnly: true });
            res.json(token);
        } catch (error) {
            const message = parseError(error);
            res.cookie('Authorization', 'alabala', { maxAge: 0 });
            res.status(400).json({ message });
        }
    }
);

authController.post('/login', userGuard(), async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.cookie('Authorization', token.accessToken, { httpOnly: true });
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        res.cookie('Authorization', 'alabala', { maxAge: 0 });
        res.status(400).json({ message });
    }
});

authController.get('/logout', guestGuard(), async (req, res) => {
    const token = req.token;
    await logout(token);
    res.clearCookie('Authorization');
    res.status(204).end();
});

authController.get('/profile', guestGuard(), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new Error(`User with ID ${req.user._id} does not exist!`);
        }
        res.json(user);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

authController.put('/profile', guestGuard(), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new Error(`User with ID ${req.user._id} does not exist!`);
        } else {
            const checkWhatIsBeingUpdated = Object.keys(req.body);
            if (checkWhatIsBeingUpdated.length == 3 && checkWhatIsBeingUpdated.includes('username') && checkWhatIsBeingUpdated.includes('email') && checkWhatIsBeingUpdated.includes('number')) {
                const result = await changeUserData(req.user._id, req.body);
                res.json(result);
            } else if (checkWhatIsBeingUpdated.length == 2 && checkWhatIsBeingUpdated.includes('current') && checkWhatIsBeingUpdated.includes('new')) {
                const result = await changePassword(req.user._id, req.body);
                res.json(result);
            } else {
                throw new Error('Wrong input data!');
            }
        }
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

authController.delete('/profile', guestGuard(), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user){
            throw new Error(`User with ID ${req.user._id} does not exist!`);
        } else {
            await deleteUser(req.user._id);
            res.status(204).end();
        }
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = authController;