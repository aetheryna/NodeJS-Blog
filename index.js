const path = require("path");
const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");

const Post = require("./database/models/Post");
const storePost = require("./middleware/storePost");

const homePageController = require("./controllers/homePage");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");
const createPostController = require("./controllers/createPost");
const createAccountController = require("./controllers/createAccount");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");

const app = new express();
const mongoStore = connectMongo(expressSession);

mongoose
  .connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true })
  .then(() => console.log("You are connected to MongoDB!"))
  .catch(err => console.error("Woops, something went wrong :(", err));

app.use(express.static("public"));
app.use(fileUpload());
app.use(expressEdge);
app.use(bodyParser.json());
app.use("/posts/store", storePost);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.set("views", __dirname + "/views");

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", createPostController);
app.get("/auth/register", createAccountController);
app.get("/auth/login", loginController);

app.post("/users/register", storeUserController);
app.post("/users/login", loginUserController);
app.post("/posts/store", storePostController);

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
