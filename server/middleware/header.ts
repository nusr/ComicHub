import * as Koa from 'koa';
import logger from '../utils/logger';

const headers = {
  'Access-Control-Allow-Methods': 'GET,HEAD,PUT,POST,DELETE,PATCH',
};

const headerHandler = async (
  ctx: Koa.Context,
  next: Function,
) => {
  ctx.set(headers);
  ctx.set({
    'Access-Control-Allow-Origin': `${ctx.host}`,
  });
  await next();
  // api request
  if (ctx.state.data) {
    logger.info(`current request url: ${ctx.url}`);
    ctx.set({
      'Content-Type': 'application/json; charset=utf-8',
    });
  }
};
export default headerHandler;
