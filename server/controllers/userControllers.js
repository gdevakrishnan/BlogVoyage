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
        res.status(200).json({ message: "Registered Successfully" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

// LOGIN
const getUserDetails = async (req, res) => {
    try {
        const { uname, gmail, pwd } = req.body;
        const preUser = await userModels.findOne({ gmail });
        if (!preUser) {
            res.status(200).json({message: "User Not Found"});
            return;
        }

        const pwdVerify = await bcrypt.compare(pwd, preUser.pwd);

        if (!(pwdVerify)) {
            res.status(200).json({ message: "Wrong Password" });
            return;
        }

        if (pwdVerify && preUser.uname == uname) {
            const token = await jwt.sign({ ...preUser }, SECRET_KEY, { expiresIn: EXPIRY_TIME });
            res.status(200).json({ token, message: "Login Successfully" });
            return;
        }

        res.status(200).json({message: "User Not Found"});
    }   catch (e) {
        res.status(400).json({message: e.message});
    }
}

// TOKEN VERIFY
const userVerify = async (req, res) => {
    try {
        const { token } = req.body;
        const data = await jwt.verify(token, SECRET_KEY)._doc;
        res.status(200).json({ data: {_id: data._id, uname: data.uname, gmail: data.gmail, posts: data.posts}, message: "Verified User" });
    }   catch (e) {
        res.status(400).json({ message: e.message });
    }
}

module.exports = { createUserDetails, getUserDetails, userVerify }