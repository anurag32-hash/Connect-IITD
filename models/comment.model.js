const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentContent: {
        type: String
    },
    commentDateTime: {
        type: String
    }
});

mongoose.model('Comment',commentSchema);