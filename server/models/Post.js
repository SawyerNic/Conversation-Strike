const mongoose = require('mongoose');

let PostModel = {};

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    topic: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

PostModel = mongoose.model('Posts', PostSchema);
module.exports = PostModel;