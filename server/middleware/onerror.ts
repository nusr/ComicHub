import logger from '../utils/logger';
import * as Koa from 'koa';

const errorHandler = async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    logger.error(
      `Error in ${ctx.request.path}: ${err instanceof Error ? err.stack : err}`
    );
    ctx.set({
      'Content-Type': 'text/html; charset=UTF-8',
    });
    ctx.body = `Comic 发生了一些意外: <pre>${
      err instanceof Error ? err.stack : err
    }</pre>`;
    if (err.status === 401) {
      ctx.status = 401;
    } else {
      ctx.status = 404;
    }
  }
};
export default errorHandler;
