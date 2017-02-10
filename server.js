var express = require("express");
var path = require("path");
var ejsMate = require("ejs-mate");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
// var multer = require("multer");

var { port } = require("./config");
var app = new express();
var { 
  changeLogRouter,
  cfgRouter,
  userRouter,
  apiRouter
} = require("./router");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", ejsMate);
app.locals._layoutFile = "layout.html";

app.use(express.static("www"));

// session，reqeuest参数处理
app.use(session({
  secret: "hello world"
}));
app.use(function(req, res, next) {
  res.locals = req.session;
  next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(multer());

app.get("/", function(req, res) {
  res.redirect("/cfg");
});
app.use("/changelog", changeLogRouter);
app.use("/cfg", cfgRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);

app.use("*", function(req, res) {
  res.send("404");
  res.end();
});

app.listen(port, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log(`app listening at port ${port}`);
  }
});