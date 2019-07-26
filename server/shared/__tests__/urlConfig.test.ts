import { Browser, Page } from 'puppeteer';
import Puppeteer from '../../utils/puppeteer';
import urlConfig from '../urlConfig';

const DELAY_TIME = 100000;
describe('Test Base Url', () => {
  let page: Page;
  let browser: Browser;
  beforeAll(async () => {
    browser = await Puppeteer();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  const testPage = (path: string) => async () => {
    await page.goto(path, {
      waitUntil: 'domcontentloaded',
    });
    const list: string[] = await page.evaluate(() => {
      const arr: HTMLImageElement[] = Array.prototype.slice.apply(
        document.querySelectorAll('img'),
      );
      return arr.map((v: HTMLImageElement) => v.src);
    });
    expect(list.length).toBeGreaterThan(0);
  };
  Object.values(urlConfig).forEach(item => {
    it(
      `base url ${item.base} should include many images`,
      testPage(item.base),
      DELAY_TIME,
    );
  });
});
