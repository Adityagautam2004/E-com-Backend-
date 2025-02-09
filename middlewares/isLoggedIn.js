const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            req.flash('error', 'you need to login first');
            return res.redirect('/');
        }
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email }).select('-password'); ;
        if (!user) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (err) {
        req.flash('error', 'something went wrong');
        return res.redirect('/');
    }
}