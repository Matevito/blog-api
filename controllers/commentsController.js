/* eslint-disable no-unused-vars */
const Comment = require("../models/comment");
const schemaComment = require("../dependencies/commentSchemas/commentSchema");
const lastFirst = require("../dependencies/lastFirst");
const checkUserInPost = require("../dependencies/checkUserInPost");

exports.create_comment  = async (req, res) => {
    // 1. format comment data.
    const { error } = schemaComment.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    // 2. make new comment object
    const new_comment = new Comment({
        text: req.body.text,
        post: req.params.id
    })

    // 3. attemp to save the article and send a response!
    try {
        const savedComment = await new_comment.save()
        res.json({
            error: null,
            message: "comment created successfully!",
        })
    } catch (error) {
        res.tatus(400).json({ error })
    }
};

exports.get_commentList = async (req, res) => {
    const commentList = await Comment.find({ "post": req.params.id });
    if (!commentList) {
        return res.status(400).json({
            error: "Error fetching data."
        })
    }

    const sortedComments = lastFirst(commentList);

    res.json({
        error: null,
        message: "todo: send comments from the post.",
        data: sortedComments,
    })
}

exports.delete_comment = async (req, res) => {
    // edit a comment changing it's message to "deleted message!"
    // 1. only the author of the post can edit it's messages.
    const tokenId = req.user.id;
    const articleId = req.params.id;
    const authorAutentication = await checkUserInPost(tokenId, articleId);
    if (!authorAutentication) {
        return res.status(401).json({
            error: "Access denied."
        })
    }

    // 2. get old comment and check it exist!
    const oldComment = await Comment.findById(req.params.commentID);
    if (!oldComment) {
        return res.status(400).json({
            error: "Error fetching data"
        })
    }

    // 3. make new comment object
    const deletComment = new Comment({
        _id: oldComment._id,
        text: "This comment was deleted!",
        post: oldComment.post,
        timeStamp: oldComment.timeStamp
    })

    // 4. attemp to update the "deleted message" and send a response
    try {
        const savedComment = await Comment.findByIdAndUpdate(oldComment._id, deletComment);
        res.json({
            error: null,
            message: "Comment was deleted without problem."
        })
    } catch (error) {
        res.status(400).json({ error })
    }
};