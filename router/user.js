var express = require("express");
var router = express.Router();

var {
  userLoginPage,
  userLogin,
  userLogout
} = require("../controller/user");

router.get("/login", userLoginPage);
router.post("/login", userLogin);
router.get("/logout", userLogout);

module.exports = router;