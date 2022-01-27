const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const commentSchema = mongoose.Schema({
    text: { type:String},
    post: { type: mongoose.Schema.ObjectId, ref: "Post", required: true },
    timeStamp: { type: Date, default: DateTime.now() }
});

// method for formatted timeStamp
commentSchema.method.formatted_time = function() {
    return this.timeStamp.toLocaleString();
};

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;