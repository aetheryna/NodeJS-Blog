const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  username: String
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
