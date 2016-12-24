var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");

var { docdir } = require("./config");
var abDocDir = path.resolve(docdir);
if(fs.existsSync(abDocDir) && fs.stat(abDocDir).isDirectory()) {

  // 根目录存在

} else {

  // 根目录不存在
  // 创建目录
  // f
}

router.get("/:urlKey", function(req, res, next) {

  var urlKey = req.params.urlKey;



  res.send(urlKey);
  res.end();

  // next();
});

module.exports = router;