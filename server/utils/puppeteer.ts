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
        `--user-agent=${config.ua}`,
    ],
    headless: true,
    ignoreHTTPSErrors: true,
    userDataDir: './tmp',
};

const puppeteerBrowser = async () => {
    let browser;
    if (config.puppeteerWSEndpoint) {
        browser = await puppeteer.connect({
            browserWSEndpoint: config.puppeteerWSEndpoint,
        });
    } else {
        browser = await puppeteer.launch(options);
    }
    setTimeout(async () => {
        if ((await browser.process()).signalCode) {
            browser.close();
        }
    }, 5000);

    return browser;
};
export default puppeteerBrowser;
