const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });
const DB = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(DB).then(() =>
{
    console.log("Connected to Database");
});
const PORT = process.env.PORT;
app.listen(PORT, () =>
{
    console.log(`Server started on PORT ${PORT}`);
});
module.exports = app;    