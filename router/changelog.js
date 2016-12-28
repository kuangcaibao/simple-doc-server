var express = require("express");
var router = express.Router();
var { changeLogRoute } = require("../controller/changelog");

router.get("/:key", changeLogRoute);

module.exports = router;