const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: 'Username field is required'
    },
    password: {
        type: String,
        required: 'Password field is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    isVerified: {
        type: Number
    },
});

userSchema.methods.validatePassword = function(pass){
    return true;
}

mongoose.model('User',userSchema);