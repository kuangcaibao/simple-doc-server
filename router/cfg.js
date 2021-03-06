/**
  tdx 手机配置处理路由
*/

var express = require("express");
var router = express.Router();

var {
  cfgHomePage,
  cfgCreatePage,
  cfgDetailPage,
  cfgDetailModifyPage
} = require("../controller/cfg");

var {
  userIsLogin
} = require("../controller/user");

router.get("/", cfgHomePage);
// router.get("/create", userIsLogin, cfgCreatePage);
router.get("/create", cfgCreatePage);
router.get("/detail/:id", cfgDetailPage);
router.get("/modify/:id", cfgDetailModifyPage);

module.exports = router;