//建立数据连接
const mysql = require("mysql")

function createConnection(){
    const connection = mysql.createConnection({
    host: "127.0.0.1",
    port:"3306",
    user:"root",
    password:"950428yuan",
    database:"my_blog"
  })
  return connection;
}

module.exports.createConnection = createConnection;