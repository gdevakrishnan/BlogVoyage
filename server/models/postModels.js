const { Schema, default: mongoose } = require("mongoose");

const postModel = new Schema(
    {
        uname: {
            type: String,
            require: true
        },
        gmail: {
            type: String,
            require: true
        },
        post: {
            blogTitle: {
                type: String,
                require: true
            },
            blog: {
                type: String,
                require: true
            }
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('postModel', postModel, 'Posts');