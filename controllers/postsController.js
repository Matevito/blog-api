/* eslint-disable no-unused-vars */
const User = require("../models/user");
const Post = require("../models/post");
const schemaPost = require("../dependencies/postSchemas/postSchema");
const lastFirst = require("../dependencies/lastFirst");

// I. Public route
exports.get_postList = async (req, res) => {
    // 1. call all post on database
    const post_list = await Post.find().populate("author", ["username"]);
    if (!post_list) {
        return res.status(400).json({
            error: "Post list not found."
        })
    }
    // 2. order list of post acording to i'ts date
    const sorted_list = lastFirst(post_list);

    // 3. send the formatted list.
    res.json({
        error: null,
        message: "returned all posts successfully.",
        data: sorted_list
    })
};

exports.get_post = async (req, res) => {
    // return post with :id
    const post = await Post.findById(req.params.id).populate("author", ["username", "firstName", "secondName"]);
    if (!post) {
        return res.status(400).json({
            error: "Post not found-"
        })
    }

    // send response
    res.json({
        error: null,
        message: "Found post successfully",
        data: post
    })
};

// II. private route
exports.create_article = async (req, res) => {
    //1. format new post data.
    const { error } = schemaPost.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    //2. make new article object
    const new_post = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user.id
    })

    //3. save the article and send the response.
    try {
        const savedPost = await new_post.save()
        res.json({
            error: null,
            message: "post successfully created",
            data: savedPost
        })
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.update_post = async (req, res) => {
//todo: update post with :id
    res.send("todo:")
};

exports.delete_post = async (req, res) => {
    res.send("todo:")
//todo: delete post with :id
};

exports.publish_post = async (req, res) => {
    res.send("todo:")
//todo: publish post with :id
}