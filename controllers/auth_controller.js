const User = require('../models/user_model');

exports.verify = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new Error('User not Logged In');
        }
        const user = await User.find({ token }).clone();
        req.body.user = user;
        next();
    } catch (e) {
        res.status(401).json({
            status: 'Failiure',
            error: e.toString(),
        });
    }
};
