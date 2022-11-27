**为了解决服务器对客户端路由地址的错误解决，需要引入以下组件解决**

save connect-history-api-fallback: 解决服务器端判断是否前后端路由问题

```
npm install express
npm install --save connect-history-api-fallback
```

1. copy server 里面的server.js 放到外层目录
2. npm init 初始化项目, 输入项目名称，其它默认即可。
3. npm i express
4. npm start

```
https://www.npmjs.com/package/connect-history-api-fallback
```

## Usage

The middleware is available through NPM and can easily be added.

```
npm install --save connect-history-api-fallback
```

Import the library

```js
var history = require('connect-history-api-fallback');
```

Now you only need to add the middleware to your application like so

```js
var connect = require('connect');

var app = connect()
  .use(history())
  .listen(3000);
```

Of course you can also use this piece of middleware with express:

```js
var express = require('express');

var app = express();
app.use(history());
```
