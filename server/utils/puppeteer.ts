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
  return await puppeteer.launch(options);
};


export function getHtml(selector = 'html'): string {
  const dom: JsObject | null = document.querySelector(selector);
  if (!dom) {
    return '';
  }
  return dom.innerHTML;
}

export function scrollToBottom(distance = 100): void {
  const dom: JsObject = document.scrollingElement || {};
  let lastScrollTop: number = dom.scrollTop;
  const scroll = (): void => {
    dom.scrollTop += distance;
    if (dom.scrollTop !== lastScrollTop) {
      lastScrollTop = dom.scrollTop;
      requestAnimationFrame(scroll);
    }
  };
  scroll();
}

export default puppeteerBrowser;
