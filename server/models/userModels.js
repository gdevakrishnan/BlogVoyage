const { Schema, default: mongoose } = require("mongoose");

const userModels = new Schema (
    {
        uname: {
            type: String,
            require: true
        },        
        gmail: {
            type: String,
            require: true
        },
        pwd: {
            type: String,
            require: true
        },
        posts: {
            postTitle: {
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

module.exports = mongoose.model("userModels", userModels, 'Users');