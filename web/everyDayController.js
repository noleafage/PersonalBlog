const everyDayDao = require('../dao/EveryDayDao');
const timeUtil = require("../util/TimeUtil")
const respUtil = require("../util/respUtil");

const path = new Map();

function editEveryDay(request, response) {
    request.on("data", function (data) { //读取写入的数据，交给后台Dao处理；
        // console.log(data.toString())
        
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null))
            response.end();
        })
    })
}
path.set('/editEveryDay', editEveryDay);


function queryEveryDay(request, response) {
   everyDayDao.queryEveryDay(function(result){
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "添加成功", result));
    response.end();
   })
}
path.set('/queryEveryDay', queryEveryDay);

module.exports.path = path;