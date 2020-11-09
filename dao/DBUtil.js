//建立数据连接
const mysql = require("mysql")

function createConnection(){
    const connection = mysql.createConnection({
    host: "192.168.1.40",
    port:"3306",
    user:"root",
    password:"950428yuan",
    database:"my_blog"
  })
  return connection;
}

module.exports.createConnection = createConnection;