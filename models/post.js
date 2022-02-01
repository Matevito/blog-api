const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const postSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true, maxLength: 200 },
    text: { type: String, required: true },
    author: { type: mongoose.Schema.ObjectId, ref: "User", required: true},
    timeStamp: { type: Date, default: DateTime.now() },
    published: { type: Boolean, default: false }
});

// method for formatted timeStamp
postSchema.method.formatted_time = function() {
    return this.timeStamp.toLocaleString();
};

postSchema.method.publicUrl = function() {
    return  "/post/" + this._id
}

const Post = mongoose.model("Post", postSchema);
module.exports = Post;