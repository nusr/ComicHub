import Koa from 'koa';
import fs from 'fs';
import mount from 'koa-mount';
import config from './shared/config';

import logger from './utils/logger';
import bodyParser from 'koa-bodyparser';
import errorHandler from './middleware/onerror';
import header from './middleware/header';
import mysql from './middleware/dataProcess';
import debug from './middleware/debug';

import accessControl from './middleware/accessControl';
import index from './router';

import apiTemplate from './middleware/apiTemplate';
import apiResponseHandler from './middleware/apiResponseHandler';

process.on('uncaughtException', e => {
    logger.error('uncaughtException: ' + e);
});

logger.info('Comic start!');

const app = new Koa();
app.proxy = true;

app.use(errorHandler);

app.use(header);

app.use(accessControl);

app.context.debug = {
    request: 0,
};
app.use(debug);

app.use(apiResponseHandler);
app.use(apiTemplate);

app.use(bodyParser());

app.use(mysql);

app.use(mount('/', index.routes())).use(index.allowedMethods());
let server;
if (config.connect.port) {
    server = app.listen(config.connect.port);
    logger.info('Running in http://localhost:' + config.connect.port);
}
if (config.connect.socket) {
    if (fs.existsSync(config.connect.socket)) {
        fs.unlinkSync(config.connect.socket);
    }
    server = app.listen(config.connect.socket);
    logger.info('Listening Unix Socket ' + config.connect.socket);
    process.on('SIGINT', () => {
        fs.unlinkSync(config.connect.socket);
        process.exit();
    });
}
export default {
    server: server,
    app: app,
};
