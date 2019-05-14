module.exports = async (ctx, next) => {
    ctx.debug.request++;

    await next();
};
