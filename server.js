var express = require("express");

var { listenport } = require("./config");
var app = new express();
var route = require("./route");

app.use("/", route);
app.use("*", function(req, res) {
  res.send("404");
  res.end();
});

app.listen(listenport, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log(`app listening at port ${listenport}`);
  }
});