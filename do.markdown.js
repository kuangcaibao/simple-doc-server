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
        <link rel="stylesheet" type="text/css" href="/bootstrap-3.3.5/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          ${fmtHtmlStrWithMd(mdStr)}  
        </div>
      </body>
      <script type="text/javascript" src="/jquery-1.11.3.min.js"></script>
      <script type="text/javascript" src="/bootstrap-3.3.5/js/bootstrap.min.js"></script>
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