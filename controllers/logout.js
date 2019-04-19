module.exports = (req, res) => {
  req.session.destroy(() => {
    console.log("hi");
    res.redirect("/");
  });
};
