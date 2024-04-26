const joi = require('joi');

const createUserSchema = joi.object({
    username: joi.string().required().min(4),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirm_password: joi.ref('password'),
})

module.exports = {
    createUserSchema
}