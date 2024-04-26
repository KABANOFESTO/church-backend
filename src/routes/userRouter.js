const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUserSchema, loginUserSchema } = require('../help/validation');

const User = require('../models/userModel');


router.post('/signup', async (req, res, next) => {
    try {
        const validationResult = await createUserSchema.validateAsync(req.body);
        const userExist = await User.findOne({ email: validationResult.email })
        if (userExist)
            res.status(400).json({
                "success": false,
                message: "user email already exist"
            })
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPasswrd = await bcrypt.hash(validationResult.password, salt)
            const user = new User({
                username: validationResult.username,
                email: validationResult.email,
                password: hashedPasswrd,
                role: 'admin'
            })
            user.save()
                .then(user => res.status(201).json({
                    "success": true,
                    "user": {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        token: generateToken(user)
                    }
                })).catch(err => console.log(err))
        }
    } catch (error) {
        res.status(400).json({ "success": false, message: error.message })
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const validationResult = await loginUserSchema.validateAsync(req.body);
        const { email, password } = validationResult
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                "success": true, user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user)
                }
            })
        } else {
            res.json({ "success": false, message: "Invalid credatial" }).status(400)
        }
    } catch (error) {
        res.json({ "success": false, message: error }).status(400)
    }

})

const generateToken = (id) => {
    return jwt.sign({ id }, "my-token-secret", { expiresIn: '30d' })
}


module.exports = router;