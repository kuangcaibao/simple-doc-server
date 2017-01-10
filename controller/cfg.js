// 显示配置首页
exports.cfgHomePage = function(req, res) {
  res.render("cfg/home", { "title": "配置首页" });
}

// 显示配置创建页面
exports.cfgCreatePage = function(req, res) {
  res.render("cfg/create2", { "title": "配置创建" });
}