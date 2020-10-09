const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postContent: {
        type: String,
        required: 'Post Content is required'
    },
    postDateTime: {
        type: Date
    },
    postToUserId: {
        type: String
    }
});

mongoose.model('Post',postSchema);