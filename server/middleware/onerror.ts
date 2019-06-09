import * as Koa from 'koa';
import logger from '../utils/logger';
import statusCodes from './config';

const errorHandler = async (ctx: Koa.BaseContext, next: () => Promise<any>) => {
    try {
        await next();
    } catch (err) {
        logger.error(`Error in ${ctx.request.path}: ${
            err instanceof Error ? err.stack : err
        }`);
        ctx.set({
            'Content-Type': 'text/html; charset=UTF-8',
        });
        ctx.body = `Comic 发生了一些意外: <pre>${
            err instanceof Error ? err.stack : err
        }</pre>`;
        if (err.status === statusCodes.UNAUTHORIZED) {
            ctx.status = statusCodes.UNAUTHORIZED;
        } else {
            ctx.status = statusCodes.NOT_FOUND;
        }
    }
};
export default errorHandler;
