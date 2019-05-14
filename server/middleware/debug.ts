const debugHandler = async (ctx, next) => {
  ctx.debug.request++;

  await next();
};
export default debugHandler;
