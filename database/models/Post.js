const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: string,
  description: string,
  content: string
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
