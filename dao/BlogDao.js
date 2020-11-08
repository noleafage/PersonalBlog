//将传过来的数据添加到数据库中
const dbutil = require("./DBUtil");

function insertBlog(title, content, views, tags,  ctime, utime, success){
    const insertSql = "insert into blog(`title`, `content`, `views`, `tags`, `ctime`, `utime`) value(?,?,?,?,?,?)"
    const params = [title, content, views, tags, ctime, utime];
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

function queryBlog(offset, limit,success){
    const querySql = "select * from blog order by id desc limit ?,?";
    const params = [offset, limit];
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

function queryBlogById(id, success){
    const querySql = "select * from blog  where id=? ";
    //and order by id desc limit ?,?  offset,limit, ,offset,limit
    const params = [id];
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


function queryBlogCount(success){
    const querySql = "select count(1) as count from blog";
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

//queryBlogByPage
function queryBlogByPage(offset, limit, success){
    const querySql = "select * from blog order by id desc limit ?,?";
    const params = [offset, limit];
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


function getAllBlogs( success){
    const querySql = "select * from blog order by id desc";
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

function addViews(blogId, success){
    const querySql = "update blog set views = views + 1 where id=?";
    const params = [blogId];
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

function getHotBlog(size, success){
    const querySql = "select * from blog order by views desc limit ?";
    const params = [size];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error,result){
        if(error){
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();
};

module.exports.insertBlog = insertBlog;
module.exports.queryBlog = queryBlog;
module.exports.queryBlogById = queryBlogById;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogByPage =  queryBlogByPage;
module.exports.getAllBlogs = getAllBlogs;
module.exports.addViews = addViews;
module.exports.getHotBlog = getHotBlog;


