// 显示配置首页
exports.cfgHomePage = function(req, res) {
  res.render("cfg/home", { "title": "配置首页" });
}

// 显示配置创建页面
exports.cfgCreatePage = function(req, res) {
  res.render("cfg/create2", { "title": "配置创建" });
}

// 显示配置详情界面
exports.cfgDetailPage = function(req, res) {

  var id = req.params.id;

  res.render("cfg/detail", { "title": "配置详情", id: id });
}

// 修改配置详情界面
exports.cfgDetailModifyPage = function(req, res) {

  var id = req.params.id;
  res.render("cfg/modify", {"title": "配置修改", id: id});
}