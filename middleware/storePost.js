module.exports = (req, res, next) => {
  try {
    if (
      !req.files.image ||
      !req.body.username ||
      !req.body.title ||
      !req.body.description ||
      !req.body.content
    ) {
      return res.redirect("/posts/new");
    }
    next();
  } catch (err) {
    res.redirect("/posts/new");
  }
};
