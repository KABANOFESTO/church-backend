const express = require('express');
const blogRouter = express();
const Blog = require('../models/blog');
const User = require('../models/userModel');
const { blogSchema, updateBlogSchema } = require('../help/validation');
const imageUpload = require('../help/photoupload');
const passport = require('passport');
require('../middleware/passport');

const today = new Date().toISOString();

blogRouter.get('/all', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

blogRouter.post('/add', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const validationResult = await blogSchema.validateAsync(req.body);

        const user = await User.findOne({ _id: req.user.id }).exec();
        if (!user || user.role !== 'admin') {
            return res.status(401).json({ error: 'User not authorized' });
        }

        const article = new Blog({
            title: validationResult.title,
            content: validationResult.content,
            postedDate: today,
            imageUrl: '',
        });

        if (req.files) {
            const image = await imageUpload(req);
            article.imageUrl = image.url;
        }

        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        if (error.isJoi) {
            res.status(400).json({ error: error.details[0].message });
        } else {
            console.error('Error adding blog post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});




blogRouter.patch('/update/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body;

    try {
        const validationResult = await updateBlogSchema.validateAsync({ blog_id: id, title, content });
        const user = await User.findOne({ _id: req.user.id });

        if (!user || user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const blog = await Blog.findOne({ _id: id });

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        if (validationResult.title)
            blog.title = validationResult.title;
        if (validationResult.content)
            blog.content = validationResult.content;

        const savedBlog = await blog.save();
        res.status(200).json(savedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


blogRouter.delete('/delete/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: req.user.id });

        if (!user || user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const result = await Blog.deleteOne({ _id: id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

blogRouter.post('/comment/:blog_id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { blog_id } = req.params;
        const { comment } = req.body;
        const user = await User.findOne({ _id: req.user.id });

        if (!user) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const newComment = {
            user_id: user._id,
            username: user.username,
            comment,
            postedDate: today
        };

        const blog = await Blog.findOne({ _id: blog_id });
        if (!blog) {
            return res.status(404).json({ error: "Blog doesn't exist" });
        }

        blog.comments.push(newComment);
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

blogRouter.post('/likes/:blog_id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { blog_id } = req.params;
        const user_id = req.user.id;
        const blog = await Blog.findOne({ _id: blog_id });

        if (!blog) {
            return res.status(404).json({ error: "Blog doesn't exist" });
        }

        const found = blog.likes.some(el => el.user_id.toString() === user_id.toString());
        if (found) {
            blog.likes = blog.likes.filter(item => item.user_id.toString() !== user_id.toString());
        } else {
            blog.likes.push({ user_id });
        }

        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

blogRouter.get('/single/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findOne({ _id: id });
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = blogRouter;
