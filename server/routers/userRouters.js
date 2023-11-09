const express = require('express');
const { createUserDetails, getUserDetails, userVerify } = require('../controllers/userControllers');
const routers = express.Router();

routers.post('/register', createUserDetails);
routers.post('/login', getUserDetails);
routers.post('/user_verify', userVerify);

module.exports = ("userRouters", routers);