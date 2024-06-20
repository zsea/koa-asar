[英文](https://github.com/zsea/koa-asar/blob/master/README.MD)

使用asar文件做为静态资源的Koa中间件。

# 安装

```shell
npm install --save koa-asar
```

# 使用
```js
const Asar = require("koa-asar");
const Koa = require("koa");
const app = new Koa();

app.use(Asar(archive,options));

app.listen(3000);
console.log("listening on port 3000");

```

# 参数说明

* **archive** - asar文件路径
* **options** - 配置选项
    * **root** - 网站根目录，可以理解为URL的前缀。默认值：```/```。
    * **methods** - 处理的HTTP方法，默认值：```['GET']```。
    * **rewrite** - 文件重写规则。当前值可以是函数/对象/字符串。
    * **index** - 默认文档名称。
    * **maxage** - 缓存时间。单位：秒。
    * **maxAge** - 同```maxage```。

## rewrite参数说明

* 当参数是函数时，签名如下:```rewrite(filename):Promise<string>```。
* 当参数是对象时，```key```为匹配的文件名称，```value```为重写的文件名。
* 当参数是字符串时，任何URL都会返固定的文件内容。

# 许可证

MIT