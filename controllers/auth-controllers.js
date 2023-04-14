const { ctrlWrapper } = require("../utils");

const {User} = require("../models/user");



const register = async(req, res) => {
const result = await User.create(req.body);

res.status(201).json({
    name: result.name,
    email: result.email,

})
}

module.exports = {
    register: ctrlWrapper(register),
}