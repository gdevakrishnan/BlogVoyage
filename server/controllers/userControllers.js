const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const userModels = require('../models/userModels');

require('dotenv').config();
const { SECRET_KEY, EXPIRY_TIME } = process.env;

// REGISTER
const createUserDetails = async (req, res) => {
    try {
        const { uname, gmail, pwd } = req.body;

        const preUser = await userModels.findOne({ gmail });
        if (preUser) {
            res.status(200).json({ message: "User Already Exist" });
            return;
        }

        const preUname = await userModels.findOne({ uname });
        if (preUname) {
            res.status(200).json({ message: "Username Already Exist" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(pwd, salt);

        const task = await userModels.create({ uname, gmail, pwd: hashedPwd });
        res.status(200).json({ data: task, message: "Registered Successfully" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

// LOGIN
const getUserDetails = async (req, res) => {
    try {
        const { uname, gmail, pwd } = req.body;
        const preUser = await userModels.findOne({ gmail });
        const pwdVerify = await bcrypt.compare(pwd, preUser.pwd);

        if (pwdVerify && preUser.uname == uname) {
            const token = await jwt.sign({ ...preUser }, SECRET_KEY, { expiresIn: EXPIRY_TIME });
            res.status(200).json({ token, message: "User Login Successfully" });
            return;
        }

        res.status(200).json({message: "User Not Found"});
    }   catch (e) {
        res.status(400).json({message: e.message});
    }
}

module.exports = { createUserDetails, getUserDetails }