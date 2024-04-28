const express = require('express');
const blogRouter = express();
const Blog = require('../models/blog');
const { blogSchema, updateArticleSchema } = require('../help/validation');

const imageUpload = require('../help/photoupload');



blogRouter.post('/');

module.exports = blogRouter;