const config = require('../shared/config');

const reject = (ctx) => {
    ctx.response.status = 403;
    ctx.body = {
        lastBuildDate: new Date().toUTCString(),
        updated: new Date().toISOString(),
        ttl: 24 * 60 * 60,
        title: '没有访问权限. Access denied.',
    };
};

module.exports = async (ctx, next) => {
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
            await next();
        }
    }
};
