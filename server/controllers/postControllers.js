const fs = require('fs');
const path = require('path');
const multer = require('multer');
const postModels = require("../models/postModels");

// API TO CREATE A NEW POST
const createNewPost = async (req, res) => {
    try {
        if (!req.file) {
            res.status(200).json({ message: "No File Exist" });
            return;
        } else {
            const { uname, gmail, author, blogTitle, blog } = req.body;
            const { filename } = req.file;

            const task = await postModels.create({ uname, gmail, author, thumbnail: filename, blogTitle, blog });
            res.status(200).json({ task, message: "Published successfully" });
        }
    } catch (e) {
        if (e instanceof multer.MulterError) {
            if (e.code == 'LIMIT_FILE_SIZE') {
                res.status(200).json({ message: "Maximum file size is 5mb" });
                return;
            } else {
                res.status(400).json({ message: e.message });
                return;
            }
        }
        res.status(400).json({ message: e.message });
    }
}

// API TO GET ALL POSTS
const getAllPosts = async (req, res) => {
    try {
        const task = await postModels.find({});
        res.status(200).json({ task });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

// API TO GET ALL POSTS OF A USER
const getAUserPosts = async (req, res) => {
    try {
        const { _id } = req.body;
        const task = await postModels.find({ author: _id });
        res.status(200).json({ _id, task });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

// DELETE A POST
// Cannot send a body request for Axios.delete
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const postDetails = await postModels.findOne({ _id: id });
        const { thumbnail } = postDetails;
        fs.unlink(path.join('public', 'thumbnails', thumbnail), async (e) => {
            if (e) {
                res.status(200).json({ message: e.message });
                return;
            }

            const task = await postModels.findByIdAndDelete({ _id: id });
            res.status(200).json({ message: "Deleted Successfully" });
        });
    } catch (e) {
        console.log(`message: ${e.message}`);
        res.status(400).json({ message: e.message });
    }
}

// UPDATE POST DETAILS (ONLY BLOG TITLE AND BLOG)
const updateBlog = async (req, res) => {
    try {
        const { blog, blogTitle } = req.body;
        const { id } = req.params;
        const task = await postModels.findByIdAndUpdate({ _id: id }, { $set: { blog, blogTitle } });
        res.status(200).json({ message: "Updated Successfully" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const updateBlogAndThumbnail = async (req, res) => {
    try {
        const { blog, blogTitle, prevThumbnail } = req.body;
        const { id } = req.params;
        const { filename } = req.file;
        fs.unlink(path.join('public', 'thumbnails', prevThumbnail), async (e) => {
            if (e) {
                res.status(200).json({ message: e.message });
                return;
            }

            const task = await postModels.findByIdAndUpdate({ _id: id }, { $set: { blog, blogTitle, thumbnail: filename } });
            res.status(200).json({ message: "Updated Successfully" });
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

module.exports = { createNewPost, getAllPosts, getAUserPosts, deletePost, updateBlog, updateBlogAndThumbnail };