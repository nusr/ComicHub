import Koa from 'koa';
import _ from 'lodash';
import { Server } from 'http';
import mount from 'koa-mount'
import bodyParser from 'koa-bodyparser';
import config from './shared';
import logger from './utils/logger';
import errorHandler from './middleware/onerror';
import header from './middleware/header';
import mysql from './middleware/dataProcess';

import accessControl from './middleware/accessControl';
import router from './router';

import apiResponseHandler from './middleware/apiResponseHandler';

logger.info('Comic start!');

const app: Koa = new Koa();

app.use(errorHandler);

app.use(header);

app.use(accessControl);

app.use(apiResponseHandler);

app.use(bodyParser());

app.use(mysql);
app.use(mount('/', router.routes() as Koa.Middleware)).use(router.allowedMethods());
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
