const express = require('express');
const morgan = require('morgan');
const blogRouter = require('./routers/blog_router');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/blog', blogRouter);
app.get('/test', (req, res) =>
{
    res.status(200).json({ status: "Success" });
})
module.exports = app;
