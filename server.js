var express = require("express");

var { port } = require("./config");
var app = new express();
var { changeLogRouter } = require("./router");

app.use(express.static("www"));
app.use("/changelog", changeLogRouter);

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