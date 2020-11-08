const blogList = new Vue({
    el:"#blog_list",
    data:{
        blogList:""
    },
    methods:{

    },
    computed:{
        jumpTo: function() {
            return function (id) {
                location.href = "/blogDetail.html?id=" + id;
            }
        }
    },
    created: function(){
        axios({
            url:"/getAllBlogs",
            method:"get"
        }).then(res=>{
            // console.log(res.data)
            blogList.blogList = res.data.data;
        })
    }
})