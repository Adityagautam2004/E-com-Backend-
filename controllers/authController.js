const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generatetoken');


module.exports.registerUser = async (req, res) => {
    try{
    let { fullname, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        res.status(401).send({message: "User already exists"});
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            if (err) {
                res.send(err.message);
            }else{
                let user = await User.create({ fullname, email, password: hash })
                let token = generateToken(user);
                res.cookie('token', token);
                res.send({message: "User Registered", token});
            }
        });
    });

    } catch (err) {
        res.send(err.message);
    }
}