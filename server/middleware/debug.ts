import * as Koa from 'koa';
const debugHandler = async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
  ctx.debug.request++;

  await next();
};
export default debugHandler;
