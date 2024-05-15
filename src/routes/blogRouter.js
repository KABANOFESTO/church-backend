const express = require('express');
const blogRouter = express();
const blogController = require('../controllers/blogController')
const passport = require('passport');
require('../middleware/passport');



blogRouter.get('/all', blogController.getAllBlog);

blogRouter.post('/add', passport.authenticate("jwt", { session: false }), blogController.createBlog);

blogRouter.patch('/update/:id', passport.authenticate("jwt", { session: false }), blogController.updateBlog);


blogRouter.delete('/delete/:id', passport.authenticate("jwt", { session: false }), blogController.deleteBlog);

blogRouter.post('/comment/:blog_id', passport.authenticate("jwt", { session: false }), blogController.blogComments);

blogRouter.post('/likes/:blog_id', passport.authenticate("jwt", { session: false }), blogController.blogLikes);

blogRouter.get('/single/:id', blogController.getOneBlog);

module.exports = blogRouter;
