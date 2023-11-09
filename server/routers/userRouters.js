const express = require('express');
const { createUserDetails, getUserDetails } = require('../controllers/userControllers');
const routers = express.Router();

routers.post('/register', createUserDetails);
routers.post('/login', getUserDetails);

module.exports = ("userRouters", routers);