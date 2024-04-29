const express = require('express');
const blogRouter = express();
const Blog = require('../models/blog');
const User = require('../models/userModel');
const { blogSchema, updateBlogSchema } = require('../help/validation');
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
        User.findOne({
            _id: req.user._id
        }).then(async (result) => {
            if (result.role.toString() == 'admin') {
                const blog = new blog({
                    title: validationResult.title,
                    content: validationResult.content,
                    postedDate: today,
                    imageUrl: '',
                })
                if (req.files) {
                    const image = await imageUpload(req);
                    blog.imageUrl = image.url
                }
                blog.save()
                    .then(result => {
                        res.status(201).json(result)
                    })
                    .catch(error => console.log(error))
            } else {
                res.json({ message: 'User is Not Authorized' })
            }
        })
    } catch (error) {
        res.status(500).json(console.error)
    }
})

blogRouter.patch('/update', async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body;

    try {
        const validationResult = await updateBlogSchema.validateAsync({ blog_id: id, title, content });

        User.findOne({
            _id: req.user.id
        }).then((user) => {
            if (user.role.toString() == 'admin') {
                Blog.findOne({ _id: id })
                    .then(blog => {
                        if (validationResult.title)
                            blog.title = validationResult.title;
                        if (validationResult.content)
                            blog.content = validationResult.content
                        blog.save()
                            .then(result => res.status(200).json(result))
                            .catch(error => console.log(error))
                    })
                    .catch(error => {
                        res.status(404).json({ error: 'blog doesnt exist!' })
                    })
            } else {
                res.status(401).json({ message: 'user are not Authorized' })
            }
        }).catch((error) => {
            res.status(500).json({ message: error })
        })
    } catch (error) {
        res.status(500).json(console.log(error))
    }

})

module.exports = blogRouter;