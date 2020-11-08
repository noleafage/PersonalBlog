const BlogDao = require('../dao/BlogDao');
const TagDao = require("../dao/TagDao");
const TagBlogMapping = require("../dao/TagBlogMapping")

const timeUtil = require("../util/TimeUtil")
const respUtil = require("../util/respUtil");

const url = require("url");

const path = new Map();

function queryBlog(request, response) {
    var params = url.parse(request.url, true).query;
    var offset = params.offset;
    var limit = params.limit;
    BlogDao.queryBlog(parseInt(offset), parseInt(limit), function (result) {
        for (var i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<\/[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
            if (result[i].content.length > 300) {
                result[i].content = result[i].content.substr(0, 300);
            }
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set('/queryBlog', queryBlog);

//title, content,  views, tags, ctime, utime, success
function editBlog(request, response) {
    request.on("data", function (data) {
        var data = JSON.parse(data.toString())
        BlogDao.insertBlog(data.title, data.content, 0, data.tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null))
            response.end();
            var blogId = result.insertId;//拿到结果的id
            var tagList = data.tags.replace("，", ",").split(",");
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        })
    })
}
path.set('/editBlog', editBlog);

function queryTag(tag, blogId) {
    TagDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);//无标签，创建标签
        } else {
            TagBlogMapping.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) { });//有标签，创建mapping映射
        }
    })
}

function insertTag(tag, blogId) {
    TagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId);//创建标签后 创建mapping映射
    })
}

function insertTagBlogMapping(tagId, blogId) {
    TagBlogMapping.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) { })
}


function getBlogDetail(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params)
    if (!params.id) {
        response.write(400);
        response.end("must be have param id");
        return;
    }
    BlogDao.queryBlogById(parseInt(params.id), function (result) {
        for(var i = 0; i < result.length; i++){
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end();
        BlogDao.addViews(parseInt(params.id), function (result) { })
    })

}
path.set('/getBlogDetail', getBlogDetail)

function getTotalBlogCount(request, response) {
    BlogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end();
    })
}
path.set('/getTotalBlogCount', getTotalBlogCount);

function getBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    var offset = params.offset;
    var limit = params.limit;
    if (params.tag) {
        return;
    } else {
        BlogDao.queryBlogByPage(parseInt(offset), parseInt(limit), function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].content = result[i].content.replace(/<[a-zA-Z]+>/g, "");
                result[i].content = result[i].content.replace(/<\/[a-zA-Z]+>/g, "");
                result[i].content = result[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
                result[i].ctime = timeUtil.timeFormat(result[i].ctime);
                if (result[i].content.length > 300) {
                    result[i].content = result[i].content.substr(0, 300);
                }
            }
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result))
            response.end();
        })
    }
}
path.set('/getBlogByPage', getBlogByPage);

function getAllBlogs(request, response) {
    BlogDao.getAllBlogs(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end();
    })
}
path.set('/getAllBlogs', getAllBlogs);

function getHotBlog(request, response) {
    var params = url.parse(request.url, true).query;
    BlogDao.getHotBlog(parseInt(params.size), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end();
    })
}
path.set('/getHotBlog', getHotBlog);

module.exports.path = path;
