const express = require('express');
const { getAllPosts, getAUserPosts, deletePost } = require('../controllers/postControllers');
const routers = express.Router()

routers.get('/', getAllPosts);
routers.post('/user_posts', getAUserPosts);
routers.post('/delete_post', deletePost);

module.exports = ('postRouters', routers);