import puppeteer, { Browser, Page, LoadEvent } from 'puppeteer';
import config, { DESKTOP_WINDOW_SIZE } from '../shared';
import sleep from '../utils/wait';
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
type OptionsType = {
  waitUntil?: LoadEvent;
  isScroll?: boolean;
};
export async function getAsyncHTML(url: string, options: OptionsType) {
  const WAIT_TIME = 1000;
  const { waitUntil = 'networkidle0',isScroll = false } = options;
  const browser: Browser = await puppeteerBrowser();
  const page: Page = await browser.newPage();
  page.setViewport(DESKTOP_WINDOW_SIZE);
  await page.goto(url, {
    waitUntil,
    timeout: 0,
  });
  await page.waitFor(WAIT_TIME * 2);
  if(isScroll){
    await page.evaluate(scrollToBottom);
    await sleep(WAIT_TIME * 5);
  }
  const html = await page.evaluate(getHtml);
  await browser.close();
  return html;
}

export default puppeteerBrowser;
