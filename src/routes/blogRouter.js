const express = require('express');
const blogRouter = express();
const Blog = require('../models/blog');
const User = require('../models/userModel');
const { blogSchema, updateArticleSchema } = require('../help/validation');
const imageUpload = require('../help/photoupload');

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy


blogRouter.get('/all', (req, res) => {
    Blog.find()
        .then(result => {
            res.status(200).json(result)
        })
});

blogRouter.post('/add', async (req, res) => {
    try {
        const validationResult = await blogSchema.validateAsync(req.body);
    } catch (error) {
        res.status(500).json(console.error)
    }
})

module.exports = blogRouter;