import Koa from 'koa';
import mount from 'koa-mount';
import _ from 'lodash';
import bodyParser from 'koa-bodyparser';
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

const app: any = new Koa();
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
// @ts-ignore
app.use(mount('/', router.routes())).use(router.allowedMethods());
let koaPort: number = config.serverPort;
if (process.env.NODE_ENV === 'test') {
  koaPort = _.random(5000, 8000);
}
const server: any = app.listen(koaPort);
logger.info(`Running in http://localhost:${koaPort}`);

export default {
  app,
  server,
};
