const path = require("path");
const express = require("express");
<<<<<<< Updated upstream
=======
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
>>>>>>> Stashed changes

const app = new express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/index.html"));
});

app.get("/post/new", (req, res) => {
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

app.listen(3000, () => {
  console.log("Listening on port 3000*");
});
