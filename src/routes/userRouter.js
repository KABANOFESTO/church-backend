const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/userModel');


router.post('/signup', async (req, res, next) => {
    try {
        const validationResult = await createUserSchema.validateAsync(req.body);
        const userExist = await User.findOne({ email: validationResult.email })
        if (userExist) {
            res.status(400).json({
                "success": false,
                message: "user email already exist"
            })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPasswrd = await bcrypt.hash(validationResult.password, salt)
            const user = new User({
                username: validationResult.username,
                email: validationResult.email,
                password: hashedPasswrd,
                role: 'vistor'
            })
            user.save()
                .then(user => res.status(201).json({
                    "success": true,
                    "user": {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                    }
                })).catch(err => console.log(err))
        }
    } catch (error) {
        res.status(400).json({ "success": false, message: error.message })
    }
});

router.post('/login', (req, res, next) => {
    res.status(200).json({
        message: 'Handling login users successfully'
    });
});

module.exports = router;