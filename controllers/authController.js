const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generatetoken');
const userModel = require('../models/user-model');

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            req.flash('error', 'User already exists');
            return res.redirect('/');
        }

        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return res.send(err.message);
            }
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) {
                    return res.send(err.message);
                } else {
                    let user = await User.create({ fullname, email, password: hash });
                    let token = generateToken(user);
                    res.cookie('token', token);
                    return res.redirect('/', {token});
                }
            });
        });
    } catch (err) {
        return res.send(err.message);
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });  
        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/');
        }
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/');
        }
        let token = generateToken(user);
        res.cookie('token', token);
        res.redirect('/shop');
    } catch (err) {
        return res.send(err.message);
    }

};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.redirect('/');
    } catch (err) { 
        return res.send(err.message);
        }
};