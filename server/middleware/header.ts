import * as Koa from 'koa';
import logger from '../utils/logger';
const headers = {
  'Access-Control-Allow-Methods': 'GET',
  'Content-Type': 'application/json; charset=utf-8',
};

const headerHandler = async (
  ctx: Koa.BaseContext,
  next: () => Promise<any>
) => {
  logger.info(`current request url: ${ctx.url}`);
  ctx.set(headers);
  ctx.set({
    'Access-Control-Allow-Origin': `${ctx.host}`,
  });
  await next();
};
export default headerHandler;
