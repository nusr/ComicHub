import * as Koa from 'koa';

import statusCodes from './config';

const responseHandler = async (
    ctx: Koa.BaseContext,
    next: () => Promise<any>,
) => {
    ctx.res.statusCodes = statusCodes;
    ctx.statusCodes = ctx.res.statusCodes;

    ctx.res.success = ({
        statusCode,
        data = null,
        message = null,
    }: {
        statusCode: any;
        data: any;
        message: any;
    }) => {
        const status:number = 0;

        if (Boolean(statusCode) && statusCode < statusCode.BAD_REQUEST) {
            ctx.status = statusCode;
        } else if (!(ctx.status < statusCode.BAD_REQUEST)) {
            ctx.status = statusCodes.OK;
        }

        ctx.body = {
            status,
            data,
            message,
        };
    };
    ctx.res.ok = (params: any = {}) => {
        ctx.res.success({
            ...params,
            statusCode: statusCodes.OK,
        });
    };
    /*
         * Ctx.res.fail = ({ statusCode, code, data = null, message = null }) => {
         *     const status = -1;
         */

    /*
         *     If (!!statusCode && (statusCode >= 400 && statusCode < 500)) {
         *         ctx.status = statusCode;
         *     } else if (!(ctx.status >= 400 && ctx.status < 500)) {
         *         ctx.status = statusCodes.BAD_REQUEST;
         *     }
         */

    /*
         *     Ctx.body = { status, code, data, message };
         * };
         */

    /*
         * Ctx.res.error = ({ statusCode, code, data = null, message = null }) => {
         *     const status = -2;
         */

    /*
         *     If (!!statusCode && (statusCode >= 500 && statusCode < 600)) {
         *         ctx.status = statusCode;
         *     } else if (!(ctx.status >= 500 && ctx.status < 600)) {
         *         ctx.status = statusCodes.INTERNAL_SERVER_ERROR;
         *     }
         */

    /*
         *     Ctx.body = { status, code, data, message };
         * };
         */


    /*
         * Ctx.res.noContent = (params = {}) => {
         *     ctx.res.success({
         *         ...params,
         *         statusCode: statusCodes.NO_CONTENT,
         *     });
         * };
         */

    /*
         * Ctx.res.badRequest = (params = {}) => {
         *     ctx.res.fail({
         *         ...params,
         *         statusCode: statusCodes.BAD_REQUEST,
         *     });
         * };
         */

    /*
         * Ctx.res.forbidden = (params = {}) => {
         *     ctx.res.fail({
         *         ...params,
         *         statusCode: statusCodes.FORBIDDEN,
         *     });
         * };
         */

    /*
         * Ctx.res.notFound = (params = {}) => {
         *     ctx.res.fail({
         *         ...params,
         *         statusCode: statusCodes.NOT_FOUND,
         *     });
         * };
         */

    /*
         * Ctx.res.requestTimeout = (params = {}) => {
         *     ctx.res.fail({
         *         ...params,
         *         statusCode: statusCodes.REQUEST_TIMEOUT,
         *     });
         * };
         */

    /*
         * Ctx.res.unprocessableEntity = (params = {}) => {
         *     ctx.res.fail({
         *         ...params,
         *         statusCode: statusCodes.UNPROCESSABLE_ENTITY,
         *     });
         * };
         */

    /*
         * Ctx.res.internalServerError = (params = {}) => {
         *     ctx.res.error({
         *         ...params,
         *         statusCode: statusCodes.INTERNAL_SERVER_ERROR,
         *     });
         * };
         */

    /*
         * Ctx.res.notImplemented = (params = {}) => {
         *     ctx.res.error({
         *         ...params,
         *         statusCode: statusCodes.NOT_IMPLEMENTED,
         *     });
         * };
         */

    /*
         * Ctx.res.badGateway = (params = {}) => {
         *     ctx.res.error({
         *         ...params,
         *         statusCode: statusCodes.BAD_GATEWAY,
         *     });
         * };
         */

    /*
         * Ctx.res.serviceUnavailable = (params = {}) => {
         *     ctx.res.error({
         *         ...params,
         *         statusCode: statusCodes.SERVICE_UNAVAILABLE,
         *     });
         * };
         */

    /*
         * Ctx.res.gatewayTimeOut = (params = {}) => {
         *     ctx.res.error({
         *         ...params,
         *         statusCode: statusCodes.GATEWAY_TIME_OUT,
         *     });
         * };
         */

    await next();
};
export default responseHandler;
