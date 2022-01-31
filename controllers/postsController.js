/* eslint-disable no-unused-vars */
const User = require("../models/user");
const Post = require("../models/post");
const schemaPost = require("../dependencies/postSchemas/postSchema");

// I. Public route
exports.get_postList = async (req, res) => {
    //todo: return all posts in database
    res.send("todo:")
};
exports.get_post = async (req, res) => {
    //todo: return post with :id
    res.send("todo:")
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