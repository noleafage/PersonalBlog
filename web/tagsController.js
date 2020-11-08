const tagsDao = require("../dao/TagDao");
const tagBlogMapping = require("../dao/TagBlogMapping");
const BlogDao = require("../dao/BlogDao");
const respUtil = require('../util/respUtil')
const timeUtil = require("../util/TimeUtil")
const url = require("url")
// /getTagsCloud  queryAllTags
const path = new Map();

function queryAllTags(request, response) {
    tagsDao.queryAllTags(function (result) {
        result.sort(function () {
            return 0.5 - Math.random();
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set('/queryAllTags', queryAllTags);


function searchByTags(request, response) {
    var parmas = url.parse(request.url, true).query;
    tagsDao.queryTag(parmas.tag,function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("fail", "查询失败", result));
            response.end();
        } else {
            // var dataString = JSON.stringify(result);
            // var data = JSON.parse(dataString);
            // var tagId = data[0].id; //拿到tag_id
            tagBlogMapping.searchByTags(result[0].id, parseInt(parmas.offset),parseInt(parmas.limit),function (result) { 
                var blogList = [];
                for (var i = 0; i < result.length; i++) {
                    //
                    BlogDao.queryBlogById(result[i].blog_id, function (result) {
                        blogList.push(result[0])
                    })
                }
                getResult(blogList, result.length, response);
            })
        }
    })
}
path.set('/searchByTags', searchByTags);

function getResult(blogList, len, response) {//利用阻塞的方式获取文件内容
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response)
        }, 10)
    } else {
        for (var i = 0; i < blogList.length; i++) {
            blogList[i].content = blogList[i].content.replace(/<[a-zA-Z]+>/g, "");
            blogList[i].content = blogList[i].content.replace(/<\/[a-zA-Z]+>/g, "");
            blogList[i].content = blogList[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
            blogList[i].ctime = timeUtil.timeFormat(blogList[i].ctime);
            if (blogList[i].content.length > 300) {
                blogList[i].content = blogList[i].content.substr(0, 300);
            }
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", blogList))
        response.end();
    }
}

function getSearchByTagsCount(request, response) {
    var parmas = url.parse(request.url, true).query;
    tagsDao.queryTag(parmas.tag, function (result) {
        console.log(result.length)
        console.log(result)
        if(result.length != 0){
            tagBlogMapping.getSearchByTagsCount(result[0].id, function(result){
                response.writeHead(200);
                response.write(respUtil.writeResult("success", "查询成功", result))
                response.end();
            })
        }else{
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result))
            response.end();
        }
        
    })
}
path.set('/getSearchByTagsCount', getSearchByTagsCount);

module.exports.path = path;
