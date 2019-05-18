import tunnel from 'tunnel';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import SocksProxyAgent from 'socks-proxy-agent';
import logger from './logger';
import config from '../shared/config';

if (
    config.proxy &&
  config.proxy.protocol &&
  config.proxy.host &&
  config.proxy.port
) {
    const proxyUrl = `${config.proxy.protocol}://${config.proxy.host}:${
        config.proxy.port
    }`;
    axios.interceptors.request.use(options => {
        if (new RegExp(config.proxy.url_regex).test(options.url)) {
            switch (config.proxy.protocol) {
                case 'socks':
                    options.httpAgent = new SocksProxyAgent(proxyUrl);
                    options.httpsAgent = new SocksProxyAgent(proxyUrl);
                    break;
                case 'http':
                    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                    options.httpAgent = tunnel.httpOverHttp({
                        proxy: {
                            host: config.proxy.host,
                            port: parseInt(config.proxy.port, 10),
                            headers: {
                                'User-Agent': config.userAgent,
                            },
                        },
                    });
                    options.httpsAgent = tunnel.httpsOverHttp({
                        proxy: {
                            host: config.proxy.host,
                            port: parseInt(config.proxy.port, 10),
                            headers: {
                                'User-Agent': config.userAgent,
                            },
                        },
                    });
                    break;
                case 'https':
                    options.httpAgent = tunnel.httpOverHttps({
                        proxy: {
                            host: config.proxy.host,
                            port: parseInt(config.proxy.port, 10),
                            proxyAuth: `${config.proxy.auth.username}:${
                                config.proxy.auth.password
                            }`,
                            headers: {
                                'User-Agent': config.userAgent,
                            },
                        },
                    });
                    options.httpsAgent = tunnel.httpsOverHttps({
                        proxy: {
                            host: config.proxy.host,
                            port: parseInt(config.proxy.port, 10),
                            proxyAuth: `${config.proxy.auth.username}:${
                                config.proxy.auth.password
                            }`,
                            headers: {
                                'User-Agent': config.userAgent,
                            },
                        },
                    });
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
axiosRetry(axios, {
    retries: config.requestRetry,
    retryCondition: () => true,
    retryDelay: (count, err) => {
        logger.error(
            `Request ${err.config.url} fail, retry attempt #${count}: ${err}`
        );
        return 100;
    },
});

axios.defaults.headers.common['User-Agent'] = config.userAgent;
axios.defaults.headers.common['X-APP'] = 'comic-downloader';

export default axios;
