import * as Koa from 'koa';
import config from '../shared';
import statusCodes from './config';

const FAIL_MATCH: number = -1;
const reject = (ctx: Koa.BaseContext) => {
    ctx.response.status = statusCodes.FORBIDDEN;
    ctx.body = {
        lastBuildDate: new Date().toUTCString(),
        updated: new Date().toISOString(),
        ttl: 24 * 60 * 60,
        title: '没有访问权限. Access denied.',
    };
};

const accessControl = async (
    ctx: Koa.BaseContext,
    next: () => Promise<any>,
) => {
    const ip = ctx.ips[0] || ctx.ip;
    const requestPath = ctx.request.path;

    if (requestPath === '/') {
        await next();
    } else {
        if (config.whitelist) {
            if (
                !(
                    config.whitelist.indexOf(ip) !== FAIL_MATCH
                    || config.whitelist.indexOf(requestPath) !== FAIL_MATCH
                )
            ) {
                reject(ctx);
            }
        } else if (config.blacklist) {
            if (
                config.blacklist.indexOf(ip) !== FAIL_MATCH
                || config.blacklist.indexOf(requestPath) !== FAIL_MATCH
            ) {
                reject(ctx);
            }
        }

        if (ctx.response.status !== statusCodes.FORBIDDEN) {
            ctx.debug.request += 1;
            await next();
        }
    }
};
export default accessControl;
