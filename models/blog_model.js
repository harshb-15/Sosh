const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: String,
    createdOn: Date,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;