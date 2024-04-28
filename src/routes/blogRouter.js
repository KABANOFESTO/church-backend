const express = require('express');
const blogRouter = express();
const Blog = require('../models/blog');

blogRouter.post('/')