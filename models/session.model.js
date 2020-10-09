const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastSeenPost:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
    },
    sessionDateTime: {
        type: String
    }
});

mongoose.model('Session',sessionSchema);