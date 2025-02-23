// User page model
// Dependencies: mongoose, bcrypt, jwt
// Description: This model is used to create a schema for the user page. It will store the user's name, email, password, and token. It will also hash the password and generate a token for the user.
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: String,
    password: String,
    name: String,
    owner:  String,
    role : String, 
    enum: ['admin', 'user'], 
    default: 'user'
});

const User = mongoose.model('User', userSchema);


module.exports = User;