/**
 - application.js 是整个koa2 的入口文件，封装了context，request，response，以及最核心的中间件处理流程。
 - context.js   处理应用上下文，里面直接封装部分request.js和response.js的方法
 - request.js   处理http请求
 - response.js  处理http响应

 注意：ctx.request是context经过封装的请求对象，ctx.req是context提供的node.js原生HTTP请求对象，同理ctx.response是context经过封装的响应对象，ctx.res是context提供的node.js原生HTTP请求对象
 */
const config = require('./shared/config');
const Koa = require('koa');
const fs = require('fs');
const logger = require('./utils/logger');
const onerror = require('./middleware/onerror');
const header = require('./middleware/header');
const mysql = require('./middleware/mysql');
const debug = require('./middleware/debug');
const accessControl = require('./middleware/access-control');
const router = require('./router/router');
const mount = require('koa-mount');

// API related

const apiTemplate = require('./middleware/api-template');
const api_router = require('./router/api_router');
const apiResponseHandler = require('./middleware/api-response-handler');

process.on('uncaughtException', (e) => {
    logger.error('uncaughtException: ' + e);
});

logger.info('Comic start!');

const app = new Koa();
app.proxy = true;

// global error handing
app.use(onerror);

// 1 set header
app.use(header);

app.use(accessControl);

// 6 debug
app.context.debug = {
    request: 0,
};
app.use(debug);

app.use(apiResponseHandler);
app.use(apiTemplate);
app.use(mysql);

// router
app.use(mount('/', router.routes())).use(router.allowedMethods());

// API router
app.use(mount('/api', api_router.routes())).use(api_router.allowedMethods());

// connect
let server;
if (config.connect.port) {
    server = app.listen(config.connect.port, parseInt(config.listenInaddrAny) ? null : '127.0.0.1');
    logger.info('Running in http://localhost:' + config.connect.port);
}
if (config.connect.socket) {
    if (fs.existsSync(config.connect.socket)) {
        fs.unlinkSync(config.connect.socket);
    }
    server = app.listen(config.connect.socket, parseInt(config.listenInaddrAny) ? null : '127.0.0.1');
    logger.info('Listening Unix Socket ' + config.connect.socket);
    process.on('SIGINT', () => {
        fs.unlinkSync(config.connect.socket);
        process.exit();
    });
}

module.exports = {
    server: server,
    app: app,
};
