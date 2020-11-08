//将传过来的数据添加到数据库中
const dbutil = require("./DBUtil");

function insertEveryDay(content, ctime, success){
    const insertSql = "insert into every_day(`content`, `ctime`) value(?,?)"
    const params = [content, ctime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
};

function queryEveryDay(success){
    const querySql = "select * from every_day order by id desc limit 1"
    const params = [];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
};

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;