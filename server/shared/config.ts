import path from 'path';

export default {
    connect: {
        port: process.env.PORT || 1200, // 监听端口
        socket: process.env.SOCKET || null, // 监听 Unix Socket, null 为禁用
    },
    userAgent:
        process.env.UA
        || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
    listenInOutAddress: process.env.LISTEN_IN_OUT_ADDRESS || 1, // 是否允许公网连接，取值 0 1
    requestRetry: Number(process.env.REQUEST_RETRY) || 2, // 请求失败重试次数
    // 是否显示 Debug 信息，取值 boolean 'false' 'key' ，取值为 'false' false 时永远不显示，取值为 'key' 时带上 ?debug=key 显示
    debugInfo: process.env.DEBUG_INFO || true,
    loggerLevel: process.env.LOGGER_LEVEL || 'info',
    puppeteerWSEndpoint: process.env.PUPPETEER_WS_ENDPOINT,
    proxy: {
        protocol: process.env.PROXY_PROTOCOL,
        host: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT,
        auth: {
            username: process.env.PROXY_AUTH_USERNAME,
            password: process.env.PROXY_AUTH_PASSWORD,
        },
        url_regex: process.env.PROXY_URL_REGEX || '.*',
    },
    blacklist: process.env.BLACKLIST && process.env.BLACKLIST.split(','),
    whitelist: process.env.WHITELIST && process.env.WHITELIST.split(','),
    typeConfig: {
        search: 'search',
        chapter: 'chapter',
        download: 'images',
        downloadAll: 'downloadAll',
    },
    downloadBase: path.resolve(__dirname, '../../../downloadResult'), // 下载根目录
    pdfSupportImage: [
        '.jpeg',
        '.png',
        '.jpg',
    ], // Pdfkit 只支持 png jpeg
    bookConfig: {
        author: 'Steve Xu',
        imgWidth: 500,
    },
    mysql: {
        host: 'localhost', // 数据库服务器所在的IP或域名
        port: 3306,
        user: 'root', // 用户名
        password: 'admin123456', // 密码
        database: 'comic', // 数据库名
    },
};
