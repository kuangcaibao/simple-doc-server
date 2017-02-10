var JobHandler = require("./conn");

// 添加配置
exports.createCfg = function(params) {

  var { mdStr, labels, title, abstract } = params;

  var sql = `insert into \
  cfg_detail (content, labels, title, abstract)\
  values ("${mdStr}", "${labels.join(',')}", "${title}", "${abstract}")`;

  return JobHandler(sql);

}

// 查询配置
exports.queryCfg = function(params) {

  var { labels, pos, pageSize } = params;

  // 组装 sql 语句
  var sql = `select id, title, user, modify_time, abstract, labels from cfg_detail where `;

  labels.map(function(label, index) {
    sql += `find_in_set("${label}", labels)`;
    if(index != labels.length - 1) {
      sql += ` and `;
    }
  });

  sql += ` order by modify_time desc limit ${pos * pageSize}, ${pageSize}`;

  return JobHandler(sql);
}

// 根据cfg id 获取详细配置内容
exports.getCfgDetailById = function(id) {

  var sql = `select * from cfg_detail where id=${id}`;
  return JobHandler(sql);
}

// 根据cfg id 来修改配置内容
exports.modCfgDetailById = function(params) {

  var { id, title, abstract, labels, effective, mdStr } = params;

  labels = labels.replace(/;/g, ",");

  var sql = `update cfg_detail set title="${title}", abstract="${abstract}",\
  labels="${labels}", effective="${effective}",\
  content="${mdStr}" where id=${id}`;

  // console.log(sql);

  return JobHandler(sql);
}