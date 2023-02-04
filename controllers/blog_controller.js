const Blog = require('../models/blog_model');

exports.getAllBlogs = async (req, res) => {
    try {
        const user = req.body.user;
        if (!user.length) {
            throw new Error('User Not Found');
        } else {
            const blogs = await Blog.find({ createdBy: user[0]._id });
            res.status(200).json({
                status: 'Success',
                data: blogs,
            });
        }
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            error: error.message,
        });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const user = req.body.user;
        if (!user.length) {
            throw new Error('User Not Found');
        } else {
            const blogs = await Blog.findOneAndDelete({
                createdBy: user[0]._id,
                _id: req.body.id,
            });
            res.status(200).json({
                status: 'Success',
                deleted: blogs,
            });
        }
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            error: error.message,
        });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const user = req.body.user;
        if (!user.length) {
            throw new Error('User Not Found');
        } else {
            const blogToBeCreated = { ...req.body };
            delete blogToBeCreated.user;
            blogToBeCreated.createdBy = user[0]._id;
            var todaysDate = new Date();
            todaysDate.setHours(0, 0, 0, 0);
            blogToBeCreated.createdOn = todaysDate;
            const blogs = await Blog.create(blogToBeCreated);
            res.status(200).json({
                status: 'Success',
                created: blogs,
            });
        }
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            error: error.message,
        });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const user = req.body.user;
        if (!user.length) {
            throw new Error('User Not Found');
        } else {
            var updatedBlog = { ...req.body };
            delete updatedBlog.user;
            delete updatedBlog.id;
            delete updatedBlog.createdBy;
            delete updatedBlog.createdOn;
            const blogs = await Blog.findByIdAndUpdate(
                req.body.id,
                updatedBlog,
                {new: true},
                // { createdBy: user[0]._id }
            );
            res.status(200).json({
                status: 'Success',
                updated: blogs,
            });
        }
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            error: error.message,
        });
    }
};

// A Controller to show All Blogs created by every user, not mensioned in the assignment.
exports.showBlogsToPublic = async (req, res) => {
    try {
        const user = req.body.user;
        if (!user.length) {
            throw new Error('User Not Found');
        } else {
            var updatedBlog = { ...req.body };
            delete updatedBlog.user;
            delete updatedBlog.id;
            delete updatedBlog.createdBy;
            delete updatedBlog.createdOn;
            const blogs = await Blog.updateOne(
                { createdBy: user[0]._id, _id: req.body.id },
                updatedBlog
            );
        }
        const blogs = await Blog.find({}, { title: 1, description: 1 });
        res.status(200).json({
            status: 'Success',
            created: blogs,
        });
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            error: error.message,
        });
    }
};
