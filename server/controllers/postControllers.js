const multer = require('multer');
const postModels = require("../models/postModels");

const createNewPost = async (req, res) => {
    try {
        if (!req.file) {
            res.status(200).json({message: "No File Exist"});
            return;
        }   else {
            const { uname, gmail, author, blogTitle, blog } = req.body;
            const { filename } = req.file;

            const task = await postModels.create({uname, gmail, author, thumbnail: filename, blogTitle, blog });
            res.status(200).json({task, message: "Published successfully"});
        }
    }   catch (e) {
        if (e instanceof multer.MulterError) {
            if (e.code == 'LIMIT_FILE_SIZE') {
                res.status(200).json({message: "Maximum file size is 5mb"});
                return;
            }   else {
                res.status(400).json({message: e.message});
                return;
            }
        }
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