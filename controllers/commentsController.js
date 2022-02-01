/* eslint-disable no-unused-vars */
const Comment = require("../models/comment");
const schemaComment = require("../dependencies/commentSchemas/commentSchema");
const lastFirst = require("../dependencies/lastFirst");

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