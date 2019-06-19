import axios from 'axios';
import axiosRetry from 'axios-retry';
import logger from './logger';
import config from '../shared';

axiosRetry(axios, {
    retries: config.requestRetry,
    retryDelay: (count, err) => {
        logger.error(`Request ${err.config.url} fail, retry attempt #${count}: ${err}`);
        return 100;
    },
});

axios.defaults.headers.common['User-Agent'] = config.userAgent;
axios.defaults.headers.common['X-APP'] = 'ComicHub';

export default axios;
