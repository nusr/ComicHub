import puppeteer from 'puppeteer';
import config from '../shared/config';
const options = {
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        `--user-agent=${config.userAgent}`,
    ],
    headless: true,
    ignoreHTTPSErrors: true,
    userDataDir: './tmp',
};

const puppeteerBrowser = async () => {
    let browser: any;
    if (config.puppeteerWSEndpoint) {
        browser = await puppeteer.connect({
            browserWSEndpoint: config.puppeteerWSEndpoint,
        });
    } else {
        browser = await puppeteer.launch(options);
    }
    return browser;
};
export default puppeteerBrowser;
