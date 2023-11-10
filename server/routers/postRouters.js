const express = require('express');
const { createNewPost, getAllPosts } = require('../controllers/postControllers');
const routers = express.Router()

routers.get('/', getAllPosts);
routers.post('/new_post', createNewPost);

module.exports = ('postRouters', routers);