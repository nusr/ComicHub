import { Browser, Page } from 'puppeteer';
import Puppeteer from '../../utils/puppeteer';
import urlConfig from '../urlConfig';
import superTest from 'supertest';
import koaServer from '../../index';
import config from '../../shared/urlConfig';

const { server } = koaServer;
const request = superTest(server);

describe('test routes', () => {
  afterAll(() => {
    server.close();
  });
  const testPage = (path: string) => async () => {
    const response: superTest.Response = await request.post(`/${path}`);
    expect(response.text).toBe(
      '',
    );
  };
  Object.keys(config).forEach((key: string) => {
    it(
      `post /${key} should return ''`,
      testPage(key),
    );
  });
});


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
      waitUntil: 'networkidle0',
    });
    await page.waitFor(2000);
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
      1000000
    );
  });
});
