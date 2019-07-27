import axios from 'axios';
import axiosRetry from 'axios-retry';
import logger from './logger';
import config from '../shared';

function errorHandler(error: Error) {
  return Promise.reject(error);
}

// Add a request interceptor
axios.interceptors.request.use(function(config) {
  logger.info(`current request link: ${config.url as string}`);
  return config;
}, errorHandler);

// Add a response interceptor
axios.interceptors.response.use(function(response) {
  return response;
}, errorHandler);

axiosRetry(axios, {
  retries: config.requestRetry,
  retryDelay: (count: number, err: JsObject): number => {
    logger.error(
      `Request ${err.config.url} fail, retry attempt #${count}: ${err}`,
    );
    return 100;
  },
});

axios.defaults.headers.common['User-Agent'] = config.userAgent;
axios.defaults.headers.common['X-APP'] = 'ComicHub';

export default axios;
