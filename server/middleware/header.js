const logger = require('../utils/logger');
const config = require('../shared/config');
const headers = {
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': `public, max-age=${config.cacheExpire}`,
};

module.exports = async (ctx, next) => {
    logger.info(`current request url: ${ctx.url}`);
    ctx.set(headers);
    ctx.set({
        'Access-Control-Allow-Origin': `${ctx.host}`,
    });
    await next();
};
