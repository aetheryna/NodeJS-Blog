const path = require("path");
const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const Post = require("./database/models/Post");

const app = new express();

mongoose
  .connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true })
  .then(() => "You are connected to MongoDB!")
  .catch(err => console.error("Woops, something went wrong :(", err));

app.use(express.static("public"));
app.use(fileUpload());
app.use(expressEdge);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts
  });
});

app.get("/post/:id", async (req, res) => {
  const posts = await Post.findById(req.params.id);
  res.render("post", {
    posts
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});

app.get("/post", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/post.html"));
});

app.post("/posts/store", (req, res) => {
  const { image } = req.files;

  image.mv(path.resolve(__dirname, "public/posts", image.name), error => {
    Post.create(
      {
        ...req.body,
        image: `/posts/${image.name}`
      },
      (error, post) => {
        res.redirect("/");
      }
    );
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000*");
});
