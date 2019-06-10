import path from 'path';
import dotEnv from 'dotenv';
import fs from 'fs';
import toNum from '../utils/toNum';

const envConfig: any = dotEnv.parse(fs.readFileSync(path.join(__dirname, '../../.env')));
console.log(envConfig);
export default {
    connect: {
        port: envConfig.SERVER_PORT || 1200, // 监听端口
        socket: envConfig.SERVER_SOCKET || null, // 监听 Unix Socket, null 为禁用
    },
    userAgent:
        envConfig.USER_AGENT
        || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
    listenInOutAddress: envConfig.LISTEN_IN_OUT_ADDRESS || 1, // 是否允许公网连接，取值 0 1
    requestRetry: toNum(envConfig.REQUEST_RETRY) || 2, // 请求失败重试次数
    // 是否显示 Debug 信息，取值 boolean 'false' 'key' ，取值为 'false' false 时永远不显示，取值为 'key' 时带上 ?debug=key 显示
    debugInfo: envConfig.DEBUG_INFO || true,
    loggerLevel: envConfig.LOGGER_LEVEL || 'info',
    puppeteerWSEndpoint: envConfig.PUPPETEER_WS_ENDPOINT,
    proxy: {
        protocol: envConfig.PROXY_PROTOCOL,
        host: envConfig.PROXY_HOST,
        port: envConfig.PROXY_PORT,
        auth: {
            username: envConfig.PROXY_AUTH_USERNAME,
            password: envConfig.PROXY_AUTH_PASSWORD,
        },
        url_regex: envConfig.PROXY_URL_REGEX || '.*',
    },
    blacklist: envConfig.SERVER_BLACKLIST && envConfig.SERVER_BLACKLIST.split(','),
    whitelist: envConfig.SERVER_WHITELIST && envConfig.SERVER_WHITELIST.split(','),
    typeConfig: {
        search: 'search',
        chapter: 'chapter',
        download: 'images',
        downloadAll: 'downloadAll',
    },
    downloadBase: envConfig.DOWNLOAD_IMAGE_BASE || path.resolve(__dirname, '../../../downloadResult'), // 下载根目录
    pdfSupportImage: [
        '.jpeg',
        '.png',
    ], // Pdfkit 只支持 png jpeg
    bookConfig: {
        author: 'Steve Xu',
        imageWidth: 520,
        imageHeight: 700,
        paddingTop: 50,
        paddingLeft: 50,
    },
    mysql: {
        host: envConfig.MYSQL_HOST || 'localhost', // 数据库服务器所在的IP或域名
        port: envConfig.MYSQL_PORT || 3306,
        user: envConfig.MYSQL_USERNAME || 'root', // 用户名
        password: envConfig.MYSQL_PASSWORD || 'admin123456', // 密码
        database: envConfig.MYSQL_DATABASE || 'comic', // 数据库名
    },
};
