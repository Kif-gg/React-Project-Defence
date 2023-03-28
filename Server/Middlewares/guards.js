function guestGuard() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Log in is required!' });
        }
    };
};

function userGuard() {
    return (req, res, next) => {
        if (req.user == undefined || req.user == null || !req.user) {
            next();
        } else {
            res.status(400).json({ message: 'You are already logged in!' });
        }
    };
};

module.exports = {
    guestGuard,
    userGuard
};