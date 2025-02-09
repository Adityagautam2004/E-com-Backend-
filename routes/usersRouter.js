const express = require('express');
const router = express.Router();
const { registerUser , loginUser, logout } = require('../controllers/authController');


router.get('/user', (req, res) => {
    res.send('users Home Page');
});

router.post('/register', registerUser);

router.post('/login',loginUser);

router.get('/logout',logout);


module.exports = router;