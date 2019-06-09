import tunnel from 'tunnel';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import SocksProxyAgent from 'socks-proxy-agent';
import logger from './logger';
import config from '../shared/config';
import toNum from './toNum';

function checkProxy(data: any): boolean {
    const { proxy } = data;
    return proxy && proxy.protocol && proxy.host && proxy.port;
}

/* eslint-disable */

if (checkProxy(config)) {
    const proxyUrl = `${config.proxy.protocol}://${config.proxy.host}:${config.proxy.port}`;
    axios.interceptors.request.use((options: any) => {
        if (new RegExp(config.proxy.url_regex).test(options.url)) {
            let temp: any;
            switch (config.proxy.protocol) {
                case 'socks':
                    options.httpAgent = new SocksProxyAgent(proxyUrl);
                    options.httpsAgent = new SocksProxyAgent(proxyUrl);
                    break;
                case 'http':
                    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

                    temp = {
                        proxy: {
                            headers: {
                                'User-Agent': config.userAgent,
                            },
                            host: config.proxy.host,
                            port: toNum(config.proxy.port),

                        },
                    };
                    options.httpAgent = tunnel.httpOverHttp(temp);
                    options.httpsAgent = tunnel.httpsOverHttp(temp);
                    break;
                case 'https':
                    temp = {
                        proxy: {
                            headers: {
                                'User-Agent': config.userAgent,
                            },
                            host: config.proxy.host,

                            port: toNum(config.proxy.port),
                            proxyAuth: `${config.proxy.auth.username}:${
                                config.proxy.auth.password
                                }`,

                        },
                    };
                    options.httpAgent = tunnel.httpOverHttps(temp);
                    options.httpsAgent = tunnel.httpsOverHttps(temp);
                    break;
                default:
                    break;
            }

            if (config.proxy.auth) {
                options.headers['Proxy-Authorization'] = `Basic ${config.proxy.auth}`;
            }
            logger.info(`Proxy for ${options.url}`);
        }
        return options;
    });
}
/* eslint-enable */
axiosRetry(axios, {
    retries: config.requestRetry,
    // retryCondition: () => true,
    retryDelay: (count, err) => {
        logger.error(`Request ${err.config.url} fail, retry attempt #${count}: ${err}`);
        return 100;
    },
});

axios.defaults.headers.common['User-Agent'] = config.userAgent;
axios.defaults.headers.common['X-APP'] = 'ComicHub';

export default axios;
