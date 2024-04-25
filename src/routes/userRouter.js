const express = require('express');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Signup users successfully'
    });
});

router.post('/login', (req, res, next) => {
    res.status(200).json({
        message: 'Handling login users successfully'
    });
});

module.exports = router;