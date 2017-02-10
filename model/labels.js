var JobHandler = require("./conn");

// 获取所有的label
exports.getLabelsAll = function() {
  var sql = "select * from cfg_labels";
  return JobHandler(sql);
}