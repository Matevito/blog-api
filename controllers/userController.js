/* eslint-disable no-unused-vars */
const User = require("../models/user");
const Post = require("../models/post");

// I. public routes.

exports.get_user = async (req, res) => {
    res.json({
        message: "todo: send user :id info"
    })
};

exports.get_userList = async (req, res) => {
    // get users info
    const userList = await User.find()
    if (!userList) {
        return res.status(400).json({
            error: "User list not found."
        })
    }
    // parse data, do not send the whole info.
    const usersData = userList.map(user => {
        return { id: user._id, username: user.username }
    });
    res.json({
        error :  null,
        message: "get list of all user",
        data: usersData
    })
}

// II. protected routes.
// todo:
exports.put_user = (req, res) => {
    res.json({
        message: "edit user if req.user == id user."
    })
};

exports.get_posts = (req, res) => {
    res.json({
        message: "send posts if req.user == id.user"
    })
}