const express = require('express');
const { createUserDetails, getUserDetails, userVerify, cronJob } = require('../controllers/userControllers');
const routers = express.Router();

routers.post('/register', createUserDetails);
routers.post('/login', getUserDetails);
routers.post('/user_verify', userVerify);
routers.get('/cron_job', cronJob);

module.exports = ("userRouters", routers);