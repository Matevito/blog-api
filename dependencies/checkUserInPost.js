const Post = require("../models/post");

const checkUserInPost = async (tokenId, postId) =>  {
    // if the user that makes the request if the same that created the article, continue
    const postAuthor = await Post.findById(postId).populate("author", ["_id"]);
    if (!postAuthor) {
        // error fetching post data.
        return false
    }

    const postAuthorId = postAuthor.author._id;
    if (tokenId == postAuthorId) {
        return true
    } else {
        return false
    }
}

module.exports = checkUserInPost;