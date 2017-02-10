var {
  getLabelsAll
} = require("../model/labels");

var {
  createCfg,
  queryCfg,
  getCfgDetailById,
  modCfgDetailById
} = require("../model/cfg");

// 获取所有的标签
exports.getLabels = function(req, res) {

  getLabelsAll().then(function(rows) {
    res.json({
      errorCode: 0,
      rows: rows
    })
  }).catch(function(err) {
    res.json({
      errorCode: -1,
      errorInfo: err.toString()
    })
  })

}

// 查询配置
exports.getCfgs = function(req, res) {
  var { pos, pageSize, labels } = req.body;
  labels = labels.split(";");
  queryCfg({pos, pageSize, labels}).then(function(rows) {
    res.json({
      errorCode: 0,
      cfgs: rows
    });
  }).catch(function(e) {
    res.json({
      errorCode: -1,
      errorInfo: e.toString()
    })
  })
}

// 提交配置
exports.postCfg = function(req, res) {
  var { mdStr, labels, title, abstract } = req.body;

  if(mdStr.length < 10) {
    res.json({
      errorCode: -1,
      errorInfo: "配置文件的长度不得低于10个字符"
    });
  }

  labels = labels.split(";");
  if(labels.length == 0 || labels.length > 5) {
    res.json({
      errorCode: -1,
      errorInfo: "标签数在1-5个之间"
    })
  }

  createCfg({ mdStr, labels, title, abstract }).then(function(row) {
    res.json({
      errorCode: 0,
      info: "插入数据成功"
    });
  }).catch(function(e) {
    res.json({
      errorCode: -1,
      errorInfo: e.toString()
    });
  })

}

// 根据id获取详细内容
exports.getCfgById = function(req, res) {

  var { id }= req.body;
  getCfgDetailById(id).then(function(row) {
    var rowdata;
    if(row.length > 0) {
      rowdata = row[0];

      // 这里将数据库的Blob格式数据转换为string
      rowdata.content = rowdata.content.toString();
    }
    res.json({
      errorCode: 0,
      cfg: rowdata
    });
  }).catch(function(e) {
    res.json({
      errorCode: -1,
      errorInfo: e.toString()
    })
  })
}

// 根据id修改配置内容
exports.modCfgById = function(req, res) {

  var { id, title, abstract, labels, effective, mdStr } = req.body;
  modCfgDetailById({id, title, abstract, labels, effective, mdStr }).then(function(row) {
    res.json({
      errorCode: 0,
      info: "修改内容成功"
    })
  }).catch(function(e) {
    res.json({
      errorCode: -1,
      errorInfo: e.toString()
    })
  })
}