const tagsCloud = new Vue({
    el: "#tags_cloud",
    data: {
        tags: [],
    },
    computed: {
        randColor: function () {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return `rgb(${red},${green},${blue})`;
            }
        },
        randSize: function () {
            return function () {
                return (15 + Math.floor(Math.random() * 20)) + "px";
            }
        }
    },
    created: function () {
        //请求随机标签的数据
        axios({
            url: "/queryAllTags",
            method: "get"
        }).then(res => {
            for (var i = 0; i < res.data.data.length; i++) {
                tagsCloud.tags.push({ tag: res.data.data[i].tag})
            }
            // console.log(tagsCloud.tags)
        }).catch(err => {
            console.log(err)
        })
    },
    methods:{
        search: function (tag){
            var baseUrl = location.origin; 
            location.href = baseUrl + "?tag=" + tag;
        }
    }
})

const hotBlog = new Vue({
    el: "#hot_blog",
    data: {
        blogList: ""
    },
    computed: {
        jumpTo: function () {
            return function (id) {
                location.href = "/blogDetail.html?id=" + id;
            }
        }
    },
    created: function () {
        axios({
            url: "/getHotBlog?size=5",
            method: "get"
        }).then(res => {
            // console.log(res.data.data)
            hotBlog.blogList = res.data.data
        })
    }
})

const search = new Vue({
    el: "#search",
    data: {
        tag: "",
    },
    methods: {
        search: function (tag) {
            var baseUrl = location.origin 
            location.href = baseUrl + "?tag=" + tag;
        }
    }
})