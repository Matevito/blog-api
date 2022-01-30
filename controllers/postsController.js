/* eslint-disable no-unused-vars */
const User = require("../models/user");
const Post = require("../models/post");

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
//todo: create post
    res.send("todo:")   
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