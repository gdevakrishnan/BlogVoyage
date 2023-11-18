const express = require('express');
const { getAllPosts, getAUserPosts, deletePost } = require('../controllers/postControllers');
const routers = express.Router()

routers.get('/', getAllPosts);
routers.post('/user_posts', getAUserPosts);
routers.delete('/delete_post/:id', deletePost);

module.exports = ('postRouters', routers);