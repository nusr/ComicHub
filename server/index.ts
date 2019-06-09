import Koa from 'koa';
import fs from 'fs';
import mount from 'koa-mount';
import _ from 'lodash';
import bodyParser from 'koa-bodyparser';
import config from './shared/config';

import logger from './utils/logger';
import errorHandler from './middleware/onerror';
import header from './middleware/header';
import mysql from './middleware/dataProcess';

import accessControl from './middleware/accessControl';
import router from './router';
import apiRouter from './router/apiRouter';

import apiTemplate from './middleware/apiTemplate';
import apiResponseHandler from './middleware/apiResponseHandler';

process.on('uncaughtException', (e) => {
    logger.error(`uncaughtException: ${e}`);
});

logger.info('Comic start!');

const app: any = new Koa();
app.proxy = true;

app.use(errorHandler);

app.use(header);

app.use(accessControl);

app.context.debug = {
    request: 0,
};

app.use(apiResponseHandler);
app.use(apiTemplate);

app.use(bodyParser());

app.use(mysql);
// @ts-ignore
app.use(mount('/', router.routes())).use(router.allowedMethods());

// @ts-ignore
app.use(mount('/api', apiRouter.routes())).use(apiRouter.allowedMethods());
let server: any;
let koaPort: number | string = config.connect.port;
if (koaPort) {
    if (process.env.NODE_ENV === 'test') {
        koaPort = _.random(5000, 8000);
    }
    server = app.listen(koaPort);
    logger.info(`Running in http://localhost:${koaPort}`);
}
if (config.connect.socket) {
    if (fs.existsSync(config.connect.socket)) {
        fs.unlinkSync(config.connect.socket);
    }
    server = app.listen(config.connect.socket);
    logger.info(`Listening Unix Socket ${config.connect.socket}`);
    process.on('SIGINT', () => {
        fs.unlinkSync(config.connect.socket || '');
        process.exit();
    });
}
export default {
    app,
    server,
};
