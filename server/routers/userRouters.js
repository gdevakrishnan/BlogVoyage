const express = require('express');
const { createUserDetails } = require('../controllers/userControllers');
const routers = express.Router();

routers.post('/register', createUserDetails);

module.exports = ("userRouters", routers);