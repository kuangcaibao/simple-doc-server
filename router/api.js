var express = require("express");
var router = express.Router();

var { 
  getLabels, 
  postCfg,
  getCfgs,
  getCfgById
} = require("../controller/api");

router.post("/getlabels", getLabels);
router.post("/postCfg", postCfg);
router.post("/queryCfg", getCfgs);
router.post("/getCfgDetail", getCfgById);

module.exports = router;