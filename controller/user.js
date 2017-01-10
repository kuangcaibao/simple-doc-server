var {
  admin
} = require("../config");

// 判断用户是否登录
exports.userIsLogin = function(req, res, next) {

  if(typeof req.session.user === "undefined") {
    res.redirect("/user/login");
  } else {
    next();
  }
}

// 用户登录
exports.userLogin = function(req, res) {

  var name = req.body.name.trim().toLowerCase();
  var pwd = req.body.password.trim();

  if(name === admin.name && pwd == admin.pwd) {
    req.session.user = {name: name};
    res.redirect("/cfg");
  } else {
    res.render("user/login", { title: "用户登录", msg: "用户名或密码错误" });
  }
}

// 显示用户登录页面
exports.userLoginPage = function(req, res) {
  res.render("user/login");
}

// 用户退出
exports.userLogout = function(req, res) {
  req.session.destroy(function() {
    res.redirect("/cfg");
  })
}