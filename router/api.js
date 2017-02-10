var express = require("express");
var router = express.Router();

var { 
  getLabels, 
  postCfg,
  getCfgs,
  getCfgById,
  modCfgById
} = require("../controller/api");

router.post("/getlabels", getLabels);
router.post("/postCfg", postCfg);
router.post("/queryCfg", getCfgs);
router.post("/getCfgDetail", getCfgById);
router.post("/modCfgDetail", modCfgById);

module.exports = router;