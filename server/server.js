const express = require('express');
const path = require('path');
const app = express();
const myRouter = require('../server/router');

// 路由
myRouter(app);
// 静态资源
app.use('/static',express.static(path.join( __dirname , '../static')));

app.listen(8090);