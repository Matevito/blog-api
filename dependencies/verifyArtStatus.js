const Post = require("../models/post")

const verifyArtStatus = async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(400).json({
            error: "Error fetching data."
        })
    } else if (!post.published) {
        // if the post is not published, deny the access.
        return res.status(401).json({
            error: "Access denied"
        })
    }
    // the article is published, continue
    next()
};

module.exports = verifyArtStatus;