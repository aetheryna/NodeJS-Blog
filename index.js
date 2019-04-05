const path = require("path");
const express = require("express");

const app = new express();

app.use(express.static("public"));

// Calls up the page. It sends the request to the server and pulls the page we want. In this case it's the index.html.
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/index.html"));
});

app.listen(3000, () => {
  console.log("Listening on port 3000*");
});
