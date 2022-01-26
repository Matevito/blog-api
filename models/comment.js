const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    text: { type:String},
    post: { type: mongoose.Schema.ObjectId, ref: "Post", required: true },
    timeStamp: { type: Date, default: Date.now() }
});

// method for formatted timeStamp
commentSchema.method.formatted_time = function() {
    //todo:
};

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;