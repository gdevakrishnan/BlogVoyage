const postModels = require("../models/postModels");

const createNewPost = async (req, res) => {
    try {
        const { uname, gmail, blogTitle, blog } = req.body;
        const task = await postModels.create({uname, gmail, post: { blogTitle, blog }});
        res.status(200).json({message: "Published Successfully"});
    }   catch (e) {
        res.status(400).json({message: e.message});
    }
}

const getAllPosts = async (req, res) => {
    try {
        const task = await postModels.find({});
        res.status(200).json({task});
    }   catch (e) {
        res.status(400).json({message: e.message});
    }
}

module.exports = { createNewPost, getAllPosts };