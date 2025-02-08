const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    res.send("products Home Page");
});

module.exports = router;