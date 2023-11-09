const bcrypt = require('bcryptjs');
const userModels = require('../models/userModels');

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

module.exports = { createUserDetails }