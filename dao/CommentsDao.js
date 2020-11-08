
const dbutil = require("./DBUtil");

function insertComments(blogId, commentsId, parentName, comments, name, email, ctime, utime, success){
    const insertSql = "insert into comments(`blog_id`, `parent`, `parent_name`,`comments`, `user_name`, `email`, `ctime`, `utime`) value(?,?,?,?,?,?,?,?)"
    const params = [blogId, commentsId, parentName, comments, name, email, ctime, utime];
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

function queryComments(blogId,id, success){
    const querySql = "select * from comments where blog_id=? and parent=?"
    const params = [blogId, id];
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
}

module.exports.insertComments = insertComments;
module.exports.queryComments = queryComments;
