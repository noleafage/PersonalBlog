const CommentsDao = require('../dao/CommentsDao');
const timeUtil = require("../util/TimeUtil")
const respUtil = require("../util/respUtil");
const url = require("url")
const captcha = require("svg-captcha");
const { report } = require('process');
const path = new Map();

function sendComment(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params)
    CommentsDao.insertComments(parseInt(params.blogId), parseInt(params.commentId), params.parentName, params.content, params.name, params.email, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加留言成功", null))
        response.end();
    })
}
path.set('/sendComment', sendComment);

function getComments(request, response) {
    var parmas = url.parse(request.url, true).query;
    var blogId = parmas.blogId;
    var id = parmas.id;
    CommentsDao.queryComments(parseInt(blogId), parseInt(id), function (result) {
        for(var i = 0; i< result.length; i++){
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end();
    })
}
path.set('/getComments', getComments);

function getRomdomCode(request, response) {
    var img = captcha.create({ fontSize: 50, width: 100, height: 34 });
    response.writeHead(200);
    response.write(JSON.stringify(img));
    response.end();
}
path.set('/getRomdomCode', getRomdomCode)

module.exports.path = path;
