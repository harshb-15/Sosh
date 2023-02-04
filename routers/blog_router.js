const express = require('express');
const blogController = require('../controllers/blog_controller');
const authController = require('../controllers/auth_controller');

const router = express.Router();
router
    .route('/')
    .get(authController.verify, blogController.getAllBlogs)
    .delete(authController.verify, blogController.deleteBlog)
    .post(authController.verify, blogController.createBlog)
    .put(authController.verify, blogController.updateBlog);
module.exports = router;
