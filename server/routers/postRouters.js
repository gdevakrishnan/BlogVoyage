const express = require('express');
const { getAllPosts, getAUserPosts, deletePost, updateBlog } = require('../controllers/postControllers');
const routers = express.Router()

routers.get('/', getAllPosts);
routers.post('/user_posts', getAUserPosts);
routers.delete('/delete_post/:id', deletePost);
routers.put('/update_post/:id', updateBlog);

module.exports = ('postRouters', routers);