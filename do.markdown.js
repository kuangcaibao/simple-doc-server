var fs = require("fs");
var marked = require("marked");
var toc = require("markdown-toc");

// 根据 md 文件的路径，获得转换为 markdown 后的 html 字符串
var fmtHtmlStrWithMd = function(mdStr) {

  try {
    var htmlStr = marked(mdStr);
    return htmlStr;
  } catch(e) {
    return "转换 md 文件出错";
  }
}

var fmtHtmlTocWithMd = function(mdStr) {
  try {
    var tocList = toc(mdStr).json;
    console.log(tocList);
    return tocList;
  } catch(e) {
    return "";
  }
}

var fmtWholeHtmlStrWithMd = function(mdFilePath) {
  try {

    var mdStr = fs.readFileSync(mdFilePath, "utf8");
    var wholeHtmlStr = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Test</title>
      </head>
      <body>
        ${fmtHtmlTocWithMd(mdStr)}
        ${fmtHtmlStrWithMd(mdStr)}
      </body>
      </html>
    `;

    return wholeHtmlStr;

  } catch(e) {
    return e.toString();
  }
}

module.exports = {
  fmtWholeHtmlStrWithMd
}