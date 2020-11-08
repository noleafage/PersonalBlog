//将传过来的数据添加到数据库中
const dbutil = require("./DBUtil");

function insertTagBlogMapping(tagId, blogId, ctime, utime, success){
    const insertSql = "insert into tag_blog_mapping(`tag_id`, `blog_id`, `ctime`, `utime`) value(?,?,?,?)"
    const params = [tagId, blogId, ctime, utime];
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

function searchByTags(tagId,offset,limit,success){
    const querySql = "select * from tag_blog_mapping where tag_id=? limit ?,?";
    const params = [tagId, offset, limit];
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

function getSearchByTagsCount(tagId,success){
    const querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?"
    const params = [tagId];
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
module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.searchByTags = searchByTags;
module.exports.getSearchByTagsCount = getSearchByTagsCount;
