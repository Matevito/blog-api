/* eslint-disable no-unused-vars */
const User = require("../models/user");
const Post = require("../models/post");

const schemaUpdUser = require("../dependencies/updateSchemas/updUser");

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
        // only send posts already published in the app // published === true
    const publicPosts = userPosts.filter(post => {
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
        posts: publicPosts
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

exports.put_user = async (req, res) => {
    // 1. check if the user is the same of the request.
    const request_id = req.params.id;
    const token_id = req.user.id

    if (request_id !== token_id) {
        res.status(401).json({
            error: "Access denied"
        })
    }
    // 2. format new user data.
    const { error } = schemaUpdUser.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }
    const old_user = await User.findById(token_id);
    if (!old_user) {
        return res.status(400).json({
            error: "User not found."
        })
    }
    const updt_user = new User({
        _id: old_user._id,
        username: old_user.username,
        password: old_user.password,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        bio: req.body.bio,
        picture: req.body.picture
    })

    // 3. save new user and send a reponsonse
    try {
        const updatedUser = await User.findByIdAndUpdate(old_user._id, updt_user);
        res.json({
            error: null,
            message: "user successfully updated."
        })
    } catch (error) {
        res.status(400).json({error})
    }
};

exports.get_posts = async (req, res) => {
    /* 1. check if the user is the same of the parsed token
    if they are not the same, he has no acces to post not published */
    const request_id = req.params.id;
    const token_id = req.user.id
    if (request_id !== token_id) {
        res.status(401).json({
            error: "Access denied",
        })
    }

    // 2. Search all user posts.
    const userPosts = await Post.find({ "author": token_id });
    if (!userPosts) {
        return res.status(400).json({
            error: "Error fetching data"
        })
    }

    // 3. send data
    res.json({
        error: null,
        message: "List of all user posts send successfully",
        data: userPosts
    })
}