var fs = require("fs");
var path = require("path");

var { mdDir } = require("../config");

// 初始化操作
var dirInit = function() {

  var dirPath = path.resolve(mdDir);

  console.log(dirPath);

  if(!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    fs.mkdirSync(dirPath);
  }
}

dirInit();

// 判断文件是否存在，并且是否为一个文件
var isExistsAndIsFile = function(mdFileName) {

  var filePath = path.resolve(mdDir, mdFileName);

  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

module.exports = {
  isExistsAndIsFile,
  mdDir
}