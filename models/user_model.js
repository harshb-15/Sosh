const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    email: String,
    token: {
        type: String,
        required: true,
        minLength: 8,
    }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
