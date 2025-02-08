const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');


router.get('/user', (req, res) => {
    res.send('users Home Page');
});

router.post('/register', registerUser);


module.exports = router;