//将传过来的数据添加到数据库中
const dbutil = require("./DBUtil");

function insertTag(tags, ctime, utime,success){
    const insertSql = "insert into tags(`tag`, `ctime`, `utime`) value(?,?,?)"
    const params = [tags, ctime, utime];
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

function queryTag(tag, success){
    const querySql = "select * from tags where tag = ?";
    const params = [tag];
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

function queryAllTags(success){
    const querySql = "select * from tags";
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



module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTags = queryAllTags;


