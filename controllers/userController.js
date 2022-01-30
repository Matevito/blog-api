/* eslint-disable no-unused-vars */
const User = require("../models/user");
const Post = require("../models/post");

// I. public routes.

exports.get_user = async (req, res) => {
    // 1. fetch user data
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(400).json({
            error: "User not found."
        })
    }
    const userPosts = await Post.find({ "author": req.params.id });
    if (!userPosts) {
        return res.status(400).json({
            error: "Error fetching data"
        })
    }

    // 2. format data
        // only send posts already published in the app
    const publicPosts = userPosts.map(post => {
        if (post.published) {
            return post
        }
    });
    const userData = {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        secondName: user.secondName,
        displayName: user.displayName(),
        bio: user.secondName,
        picture: user.picture,
        posts: userPosts
    }

    // 3. json response
    res.json({
        error: null,
        message: "send user public data",
        data: userData
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
        return { 
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            url: user.url()
        }
    });
    res.json({
        error :  null,
        message: "list of all users in the app",
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