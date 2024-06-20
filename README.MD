[简体中文](https://github.com/zsea/koa-asar/blob/main/README.ZH.CN.MD)

Using ASAR Files for Static Assets in Koa Middleware

# Installation

```
npm install --save koa-asar
```

# Usage
```js
const Asar = require("koa-asar");
const Koa = require("koa");
const app = new Koa();

app.use(Asar(archive, options));

app.listen(3000);
console.log("listening on port 3000");
```

# Parameters
* archive - The path to the ASAR file.
* options - Configuration options:
* root - The website root directory, which can be understood as the URL prefix. Default value: ```/```.
* methods - HTTP methods to handle. Default value: ```['GET']```.
* rewrite - File rewrite rules. The current value can be a function/object/string.
* index - The default document name.
* maxage - Cache duration. Unit: seconds.
* maxAge - Same as maxage.

## Rewrite Parameter Description
* When the parameter is a function, the signature is as follows: ```rewrite(filename): Promise<string>```.
* When the parameter is an object, the key is the matched file name, and the value is the rewritten file name.
* When the parameter is a string, any URL will return fixed file content.

# License
MIT