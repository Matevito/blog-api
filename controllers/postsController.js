/* eslint-disable no-unused-vars */
const Post = require("../models/post");
const schemaPost = require("../dependencies/postSchemas/postSchema");
const lastFirst = require("../dependencies/lastFirst");
const checkUserInPost = require("../dependencies/checkUserInPost");

// I. Public route
exports.get_postList = async (req, res) => {
    // 1. call all post on database
    const post_list = await Post.find({ "published": true }).populate("author", ["username"]);
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
        data: sorted_list,
        
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

    // stop if the post is not published yet!
    if (!post.published) {
        return res.status(401).json({
            error: "Access denied"
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
    //   update post with :id
    // 1. check if the user is authorized to chenge it's article
    const tokenId = req.user.id;
    const articleId = req.params.id;
    const authorAutentication = await checkUserInPost(tokenId, articleId)
    if (!authorAutentication) {
    return res.status(401).json({
        error: "Access denied."
        })
    }

    // 2. parse data of post changes.
    const { error } = schemaPost.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }
    // 3. refactor new article object
    const oldArticle = await Post.findById(articleId);
    if (!oldArticle) {
        return res.status(400).json({
            error: "Error fetching data"
        })
    }
    const updatedArticle = new Post({
        _id: oldArticle._id,
        title: req.body.title,
        text: req.body.text,
        author: oldArticle.author,
        timeStamp: oldArticle.timeStamp,
        published: oldArticle.published
    })

    // 4. save the article and make a response
    try {
        const savedArticle = await Post.findByIdAndUpdate(articleId, updatedArticle);
        res.json({
            error: null,
            message: "article updated!"
        })
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.delete_post = async (req, res) => {
    // delete post with :id
    // 1. check if the user is authorized to change it's article
    const tokenId = req.user.id;
    const articleId = req.params.id;
    const authorAutentication = await checkUserInPost(tokenId, articleId)
    if (!authorAutentication) {
        return res.status(401).json({
            error: "Access denied."
        })
    }

    // 2. attempt to delete the article and send a response.
    try {
        await Post.findByIdAndRemove(articleId);
        res.json({
            error: null,
            message: "article deleted!"
        })
    } catch(error) {
        res.status(400).json({ error })
    }
};

exports.publish_post = async (req, res) => {
    // publish or unpublish post with :id
    // 1. check if the user is authorized to change it's article
    const tokenId = req.user.id;
    const articleId = req.params.id;
    const authorAutentication = await checkUserInPost(tokenId, articleId)
    if (!authorAutentication) {
        return res.status(401).json({
            error: "Access denied."
        })
    }

    // 2. refactor the new article object
    const oldArticle = await Post.findById(articleId);
    if (!oldArticle) {
        return res.status(400).json({
            error: "Error fetching data"
        })
    }

        // change the boolean value of the oldArticle.
    let publishStatus;
    if (oldArticle.published === true) {
        publishStatus = false
    } else {
        publishStatus = true
    }

    const updatedArticle = new Post({
        _id: oldArticle._id,
        title: oldArticle.title,
        text: oldArticle.text,
        author: oldArticle.author,
        timeStamp: oldArticle.timeStamp,
        published: publishStatus
    })

    // 3. save the article and send a response
    try {
        const savedArticle = await Post.findByIdAndUpdate(articleId, updatedArticle);
        res.json({
            error: null,
            message: "article publish status changed successfully.",
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}