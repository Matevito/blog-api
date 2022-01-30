const User = require("../models/user");
const Post = require("../models/post");

// I. public routes.

exports.get_user = (req, res) => {
    res.json({
        message: "todo: send user :id info"
    })
};

exports.get_usersList = (req, res) => {
    res.json({
        message: "get list of all users"
    })
}

// II. protected routes.

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