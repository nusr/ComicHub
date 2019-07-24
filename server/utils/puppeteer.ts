import puppeteer from 'puppeteer';
import config from '../shared';

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
  let browser: JsObject;
  if (config.puppeteerWSEndpoint) {
    browser = await puppeteer.connect({
      browserWSEndpoint: config.puppeteerWSEndpoint,
    });
  } else {
    browser = await puppeteer.launch(options);
  }
  return browser;
};
export const DESKTOP_WINDOW_SIZE = {
  width: 1366,
  height: 768,
};
export default puppeteerBrowser;
