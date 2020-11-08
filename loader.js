//加载web层文件

const fs = require("fs");
const globalConfig = require("./config");

const controllerSet = [];

const pathMap = new Map();

const files = fs.readdirSync(globalConfig["web_path"]);

for(var i = 0; i < files.length; i++) {
    var temp = require("./" + globalConfig["web_path"] + "/" + files[i])
    if(temp.path){
        for(var [key,value] of temp.path) {
            if(pathMap.get(key) == null) {
                pathMap.set(key, value);
            }else{
                throw new Error("url异常, url:" + key)
            }
        }
        controllerSet.push(temp);
    }
}

module.exports = pathMap;