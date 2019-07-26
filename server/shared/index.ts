import path from 'path';
import dotEnv from 'dotenv';
import fs from 'fs';
import toNum from '../utils/toNum';
import { SharedConfig } from './type';

let envPath: string = path.join(process.cwd(), '../.env');
if (process.env.NODE_ENV === 'test') {
  envPath = path.join(process.cwd(), './.env');
}
let envConfig: JsObject;
try {
  envConfig = dotEnv.parse(fs.readFileSync(envPath));
} catch (error) {
  envConfig = {};
}
const bookConfig = {
  author: 'Steve Xu',
  imageWidth: 520,
  imageHeight: 700,
  paddingTop: 50,
  paddingLeft: 50,
};
const apiType = {
  search: 'search',
  chapter: 'chapter',
  download: 'images',
  downloadAll: 'downloadAll',
};
const pdfSupportImage: string[] = ['.jpeg', '.png']; // Pdfkit 只支持 png jpeg
export { bookConfig, pdfSupportImage, apiType };
const sharedConfig: SharedConfig = {
  language: envConfig.DEFAULT_LANGUAGE || 'zh-CN',
  serverPort: toNum(envConfig.SERVER_PORT) || 1200, // 监听端口,
  userAgent:
    envConfig.USER_AGENT ||
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
  requestRetry: toNum(envConfig.REQUEST_RETRY) || 2, // 请求失败重试次数
  // 是否显示 Debug 信息，取值 boolean 'false' 'key' ，取值为 'false' false 时永远不显示，取值为 'key' 时带上 ?debug=key 显示
  debugInfo: envConfig.DEBUG_INFO || true,
  loggerLevel: envConfig.LOGGER_LEVEL || 'info',
  puppeteerWSEndpoint: envConfig.PUPPETEER_WS_ENDPOINT,
  blacklist:
    envConfig.SERVER_BLACKLIST && envConfig.SERVER_BLACKLIST.split(','),
  whitelist:
    envConfig.SERVER_WHITELIST && envConfig.SERVER_WHITELIST.split(','),
  downloadBase:
    envConfig.DOWNLOAD_IMAGE_BASE ||
    path.join(process.cwd(), '../downloadResult'), // 下载根目录
  mysql: {
    host: envConfig.MYSQL_HOST || 'localhost', // 数据库服务器所在的IP或域名
    port: toNum(envConfig.MYSQL_PORT) || 3306,
    user: envConfig.MYSQL_USERNAME || 'root', // 用户名
    password: envConfig.MYSQL_PASSWORD || 'admin123456', // 密码
    database: envConfig.MYSQL_DATABASE || 'comic', // 数据库名
  },
};
export default sharedConfig;
