const blogDetail = new Vue({
    el:"#blogDetail",
    data:{
        content:[],
    },
    created: function (){
       if(location.search.indexOf("?") >= 0) {
           var searchList = location.search.split("?")[1].split("&")
            for(var i = 0.; i < searchList.length;i++){
                if(searchList[i].split("=")[0] == "id"){
                    var id = searchList[i].split("=")[1];
                    axios({
                        url:"/getBlogDetail?id=" + id,
                        method: "get"
                    }).then(res=>{
                        // console.log(res.data.data)
                        blogDetail.content = res.data.data[0]
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            }
        }
    }
})

//问题1：点击回复
const blogComment = new Vue({
    el:"#blogComment",
    data:{
        commentList: [],
        randomCode: "",
        randomSvg: null,
        name: "",
        email: "",
        comment: "",
        inputRandomCode: "",
        commentId: 0,
        parentName: "0",
        count:0,
    },
    methods:{
        changeCode: function() { //验证码
            axios({
                url:"/getRomdomCode",
                method:"get"
            }).then(res=>{
                // console.log(res)
                blogComment.randomSvg = res.data.data;
                blogComment.randomCode  = res.data.text;
            })
        },
        sendComment:function (){
            if(this.name == "" || this.email == "" || this.comment == ""){
                alert("内容不能为空");
                return;
            }
            if(this.inputRandomCode != this.randomCode){
                alert("验证码不正确");
                return;
            }
            var blogId = 0;
            if (location.search.indexOf("?") >= 0) {
                var searchList = location.search.split("?")[1].split("&");
                for (var i = 0 ; i < searchList.length ; i ++) {
                    if (searchList[i].split("=")[0] == "id") {
                        var id = searchList[i].split("=")[1];
                        blogId = id;
                    }
                }
            }
            axios({
                url:"/sendComment?blogId=" + blogId + "&commentId=" + this.commentId + "&parentName=" + this.parentName + "&content=" + this.comment + "&name=" + this.name + "&email=" + this.email,
                method:"get"
            }).then(res=>{
                alert("留言成功");
                // console.log(res)
                blogComment.name = "";
                blogComment.email = "";
                blogComment.comment = "";
                blogComment.inputRandomCode = "";
                blogComment.commentId = 0;
            })
        }
    },
    computed:{
        huifu:function () {
            return  function(userName) {
                blogComment.parentName = userName;
                // console.log(userName)
                location.href = "#addComment"
            }
        }
    },
    created: function(){
        if (location.search.indexOf("?") >= 0) {
            var searchList = location.search.split("?")[1].split("&");
            for (var i = 0 ; i < searchList.length ; i ++) {
                if (searchList[i].split("=")[0] == "id") {
                    var blogId = searchList[i].split("=")[1];
                    axios({
                        url:"/getComments?blogId=" + blogId + "&id=0",
                        method:"get"
                    }).then(res=>{
                        // console.log(res.data.data);
                        blogComment.commentList = res.data.data;
                        blogComment.count = blogComment.commentList.length
                        for(var i = 0; i < blogComment.commentList.length; i++){
                            if(blogComment.commentList[i].parent_name != '0'){
                                // console.log(blogComment.commentList[i]);
                                blogComment.commentList[i].user_name =  blogComment.commentList[i].user_name + "：回复@" + blogComment.commentList[i].parent_name
                            }
                        }
                        
                    })
                }
            }
        }
        axios({
            url:"/getRomdomCode",
            method:"get"
        }).then(res=>{
            // console.log(res.data.text)
            blogComment.randomSvg = res.data.data;
            blogComment.randomCode  = res.data.text;
        })
    },
    
})