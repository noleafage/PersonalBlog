//读取配置文件

const fs = require('fs');

const globalConfig = {};

const conf = fs.readFileSync("./server.conf")

const configArr = conf.toString().split("\n");

for(var i = 0; i < configArr.length; i++){
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
}

module.exports = globalConfig;