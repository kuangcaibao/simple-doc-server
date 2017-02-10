var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "",
  database: "tdx_mobile_cfg"
});

// 导出数据库操作句柄，以 Promise 的方式
var JobHandler = function(sql) {
  return new Promise(function(resolve, reject) {

    pool.getConnection(function(err, conn) {
      if(err) {
        return reject(err);
      }

      conn.query(sql, function(err, res) {
        
        // 释放链接
        conn.release();

        if(err) {
          return reject(err);
        }

        return resolve(res);
      })
    })
  })
}

module.exports = JobHandler;