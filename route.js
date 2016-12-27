var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var { fmtWholeHtmlStrWithMd } = require("./do.markdown");

var routeConfig = require("./route.config");
var { docdir } = require("./config");
var abDocDir = path.resolve(docdir);
console.log(abDocDir);
if(fs.existsSync(abDocDir) && fs.statSync(abDocDir).isDirectory()) {

  // 根目录存在

} else {

  // 根目录不存在
  // 创建目录
  fs.mkdirSync(abDocDir);
}

// 路由操作
router.get("/:urlKey", function(req, res, next) {

  var urlKey = req.params.urlKey;

  // 得到key对应的文件, 判断对应文件是否存在
  var filePath = path.resolve(abDocDir, routeConfig[urlKey] || "");
  if(fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {

    res.send(fmtWholeHtmlStrWithMd(filePath));
    res.end();

  } else {

    next();
  }

});

module.exports = router;