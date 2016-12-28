var routeDict = require("../router/changelog.config");
var { isExistsAndIsFile } = require("./dir");
var { fmtWholeHtmlStrWithMd } = require("./md2html");

exports.changeLogRoute = function(req, res, next) {

  var key = req.params.key;
  var fileName = routeDict[key];
  if(typeof key == "undefined" || typeof fileName == "undefined") {
    
    next();
  } else {

    if(isExistsAndIsFile(fileName)) {
      
      res.send(fmtWholeHtmlStrWithMd(fileName));
      res.end();
    } else {
      
      res.send("file not exists!");
    }

  }

}