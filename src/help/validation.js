const joi = require('joi');

const createUserSchema = joi.object({
    username: joi.string().required().min(4),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirm_password: joi.ref('password'),
})
const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})
const blogSchema = joi.object({
    title: joi.string().min(10).required(),
    content: joi.string().min(20).required(),
})
const updateArticleSchema = joi.object({
    blog_id: joi.string().required(),
    title: joi.string().min(10),
    content: joi.string().min(20)
})

module.exports = {
    createUserSchema, loginUserSchema, blogSchema, updateArticleSchema
}