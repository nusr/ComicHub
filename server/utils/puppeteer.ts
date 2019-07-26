import puppeteer, { Browser } from 'puppeteer';
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

const puppeteerBrowser = async (): Promise<Browser> => {
  let browser: Browser;
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

export function getHtml(selector: string = 'html'): string {
  const dom: JsObject | null = document.querySelector(selector);
  if (!dom) {
    return '';
  }
  return dom.innerHTML;
}

export function scrollToBottom(): void {
  const dom: JsObject = document.scrollingElement || {};
  let lastScrollTop: number = dom.scrollTop;
  const scroll = (): void => {
    dom.scrollTop += 200;
    if (dom.scrollTop !== lastScrollTop) {
      lastScrollTop = dom.scrollTop;
      requestAnimationFrame(scroll);
    }
  };
  scroll();
}
