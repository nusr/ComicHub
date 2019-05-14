const debugHandler = async (ctx, next: () => Promise<any>) => {
  ctx.debug.request++;

  await next();
};
export default debugHandler;
