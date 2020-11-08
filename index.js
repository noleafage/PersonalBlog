const express = require('express');
const globalConfig = require('./config')
const loader = require("./loader")

const app = new express();

app.use(express.static('./page/'));

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog",loader.get("/editBlog"));
app.get("/queryBlog",loader.get("/queryBlog"));

app.get("/queryAllTags",loader.get("/queryAllTags"));

app.get("/getBlogDetail",loader.get("/getBlogDetail"));
app.get("/getTotalBlogCount",loader.get("/getTotalBlogCount"));
app.get("/getBlogByPage",loader.get("/getBlogByPage"));

app.get("/sendComment",loader.get("/sendComment"));
app.get("/getComments",loader.get("/getComments"));

app.get("/getRomdomCode",loader.get("/getRomdomCode"));

app.get("/getAllBlogs", loader.get("/getAllBlogs"));
app.get("/getHotBlog", loader.get("/getHotBlog"));

app.get("/searchByTags", loader.get("/searchByTags"));

app.get("/getSearchByTagsCount", loader.get("/getSearchByTagsCount"));

app.listen(globalConfig.port, function(){
    console.log('服务器已启动');
});