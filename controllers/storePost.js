const path = require("path");
const Post = require("../database/models/Post");

/*
--------- IMAGE VALIDATION BROKEN -----------

module.exports = (req, res) => {
  const image = req.files;
  if (image != null) {
    image.mv(
      path.resolve(__dirname, "..", "public/posts", image.name),
      error => {
        Post.create(
          {
            ...req.body,
            image: `/posts/${image.name}`
          },
          (error, post) => {
            res.redirect("/");
          }
        );
      }
    );
  } else {
    res.redirect("/posts/new");
  }
}; */

module.exports = (req, res) => {
  const { image } = req.files;

  image.mv(path.resolve(__dirname, "..", "public/posts", image.name), error => {
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
};
