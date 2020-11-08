const everyDay = new Vue({
    el: "#everyDay",
    data: {
        content: ""
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function () {
        //请求数据，给每日一句content赋值；
        axios({
            url: "/queryEveryDay",
            method: "get",
        }).then(res => {
            this.content = res.data.data[0].content
        }).catch(err => {
            console.log(err);
        })
    }
});

const blogList = new Vue({
    el: '#blogList',
    data: {
        articleList: []
    },
    computed: {
        jumpTo: function () {
            return function (id) {
                location.href = "/blogDetail.html?id=" + id;
            }
        }
    },
    created: function () {
        //请求文章数据
        if (location.search.indexOf("?") >= 0) {
            var searchList = location.search.split("?")[1].split("&");
            for (var i = 0; i < searchList.length; i++) {
                if (searchList[i].split("=")[0] == "tag") {
                    var tag = searchList[i].split("=")[1];
                    axios({
                        url: "/searchByTags?tag=" + tag +"&offset=0&limit=5",
                        // 
                        method: "get"
                    }).then(res => {
                        // console.log(res.data)
                        blogList.articleList = res.data.data;
                    })
                }
            }
        } else {
            axios({
                url: "/queryBlog?offset=0&limit=5",
                method: "get",
            }).then(res => {
                // console.log(res.data.data);
                blogList.articleList = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        }
        

    }
})

const pageTools = new Vue({
    el: "#pageTools",
    data: {
        total: 0,
        nowPage: 1,
        limit: 5,
        pageList: []
    },
    methods: {
        refresh: function () {
            var totalPage = Math.floor((pageTools.total + pageTools.limit - 1) / pageTools.limit);
            pageTools.pageList = [];
            pageTools.pageList.push({ text: "首页", pageNum: 1 });
            if (pageTools.nowPage - 2 > 0) {
                pageTools.pageList.push({ text: pageTools.nowPage - 2, pageNum: pageTools.nowPage - 2 });
            }
            if (pageTools.nowPage - 1 > 0) {
                pageTools.pageList.push({ text: pageTools.nowPage - 1, pageNum: pageTools.nowPage - 1 });
            }
            pageTools.pageList.push({ text: pageTools.nowPage, pageNum: pageTools.nowPage });
            if (pageTools.nowPage + 1 <= totalPage) {
                pageTools.pageList.push({ text: pageTools.nowPage + 1, pageNum: pageTools.nowPage + 1 });
            }
            if (pageTools.nowPage + 2 <= totalPage) {
                pageTools.pageList.push({ text: pageTools.nowPage + 2, pageNum: pageTools.nowPage + 2 });
            }
            pageTools.pageList.push({ text: "尾页", pageNum: totalPage });
        }
    },
    computed: {
        changePage: function () {
            return function (pageNum) {
                // console.log(pageNum)
                if(location.search.indexOf("?") >= 0){
                    pageTools.nowPage = pageNum;
                    console.log(pageNum)
                    this.refresh();
                    var tag = location.search.split("?")[1].split("&")[0].split("=")[1];
                    axios({
                        url: "/searchByTags?tag=" + tag + "&offset=" + (pageNum - 1) * pageTools.limit + "&limit=" + pageTools.limit,
                        method: "get"
                    }).then(res => {
                        console.log(res.data)
                        blogList.articleList = res.data.data;
                    })

                }else{
                    pageTools.nowPage = pageNum;
                    this.refresh();
                    axios({
                        url: "/getBlogByPage?offset=" + (pageNum - 1) * pageTools.limit + "&limit=" + pageTools.limit,
                        //
                        method: "get"
                    }).then(res => {
                        console.log(res.data.data)
                        blogList.articleList = res.data.data;
                    })
                }
               
            }
        }
    },
    created: function () {
        if (location.search.indexOf("?") >= 0) {
            var searchList = location.search.split("?")[1].split("&");
            for (var i = 0; i < searchList.length; i++) {
                if (searchList[i].split("=")[0] == "tag") {
                    var tag = searchList[i].split("=")[1];
                    axios({
                        url: "/getSearchByTagsCount?tag=" + tag,
                        method: "get"
                    }).then(res => {
                        pageTools.total = res.data.data[0].count;
                        pageTools.refresh();
                    })
                }
            }
        } else {
            axios({
                url: "/getTotalBlogCount",
                method: "get"
            }).then(res => {
                pageTools.total = res.data.data[0].count;
                pageTools.refresh();
            })
        }
    }
})