import config from '../shared/config';
import logger from '../utils/logger';
const headers = {
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': `public, max-age=${config.cacheExpire}`,
};

const headerHandler = async (ctx, next) => {
    logger.info(`current request url: ${ctx.url}`);
    ctx.set(headers);
    ctx.set({
        'Access-Control-Allow-Origin': `${ctx.host}`,
    });
    await next();
};
export default headerHandler;
