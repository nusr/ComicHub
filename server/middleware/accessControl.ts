import config from '../shared/config';
import * as Koa from 'koa';

const reject = (ctx: Koa.BaseContext) => {
    ctx.response.status = 403;
    ctx.body = {
        lastBuildDate: new Date().toUTCString(),
        updated: new Date().toISOString(),
        ttl: 24 * 60 * 60,
        title: '没有访问权限. Access denied.'
    };
};

const accessControl = async (
    ctx: Koa.BaseContext,
    next: () => Promise<any>
) => {
    const ip = ctx.ips[0] || ctx.ip;
    const requestPath = ctx.request.path;

    if (requestPath === '/') {
        await next();
    } else {
        if (config.whitelist) {
            if (
                !(
                    config.whitelist.indexOf(ip) !== -1 ||
                    config.whitelist.indexOf(requestPath) !== -1
                )
            ) {
                reject(ctx);
            }
        } else {
            if (config.blacklist) {
                if (
                    config.blacklist.indexOf(ip) !== -1 ||
                    config.blacklist.indexOf(requestPath) !== -1
                ) {
                    reject(ctx);
                }
            }
        }

        if (ctx.response.status !== 403) {
            ctx.debug.request++;
            await next();
        }
    }
};
export default accessControl;
