const express = require('express');
const { getAllPosts } = require('../controllers/postControllers');
const routers = express.Router()

routers.get('/', getAllPosts);

module.exports = ('postRouters', routers);