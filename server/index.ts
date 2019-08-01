import Koa from 'koa';
import _ from 'lodash';
import { Server } from 'http';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import config from './shared';
import logger from './utils/logger';
import errorHandler from './middleware/onerror';
import header from './middleware/header';
import mysql from './middleware/dataProcess';

import accessControl from './middleware/accessControl';
import router from './router';

import apiResponseHandler from './middleware/apiResponseHandler';

process.on('uncaughtException', e => {
  logger.error(`uncaughtException: ${e}`);
});

logger.info('Comic start!');

const app: Koa = new Koa();
app.proxy = true;

app.use(errorHandler);

app.use(header);

app.use(accessControl);

app.context.debug = {
  request: 0,
};

app.use(apiResponseHandler);

app.use(bodyParser());

app.use(mysql);
const absPath = process.cwd() + '/dist/views';
app.use(koaStatic(absPath));
app.use(router.routes()).use(router.allowedMethods());
let koaPort: number = config.serverPort;
if (process.env.NODE_ENV === 'test') {
  koaPort = _.random(5000, 8000);
}
const server: Server = app.listen(koaPort);
logger.info(`Running in http://localhost:${koaPort}`);

export default {
  app,
  server,
};
