var Koa = require('koa'), WEBPORT = 8080
    , Asar = require("../index")
    , path = require("path")
    ;
var app = new Koa();
app.use(Asar(path.join(__dirname,'test.asar'), { "root": "/", index: "index.html", maxage: 3600 }));
app.listen(WEBPORT, function (err) {
    if (err) {
        console.error('开启端口失败', err);
        process.exit(1);
    }
    else {
        console.log('启动成功:', WEBPORT)
    }
});