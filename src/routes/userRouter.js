const express = require('express');
const router = express.Router();

router.post('/signup', async(req, res, next) => {
//    try{
//     const validationResult,
//    }
});

router.post('/login', (req, res, next) => {
    res.status(200).json({
        message: 'Handling login users successfully'
    });
});

module.exports = router;