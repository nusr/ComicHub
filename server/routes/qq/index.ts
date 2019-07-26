import * as Koa from 'koa';
import { Browser, Page } from 'puppeteer';
import util from './utils';
import axios from '../../utils/axios';
import { apiType } from '../../shared';
import { IRequestData } from '../../type';
import puppeteer, { getHtml, scrollToBottom } from '../../utils/puppeteer';

const WAIT_TIME = 1000;
let temp: object;
const tuHao = async (ctx: Koa.BaseContext) => {
  const { type, name }: IRequestData = ctx.request.body;
  if (apiType.search === type) {
    const response = await axios.get(util.getSearchUrl(name));
    temp = util.getSearchList(response.data);
  }
  if (apiType.chapter === type) {
    const response = await axios.get(name);
    temp = util.getChapterList(response.data);
  }
  if (apiType.download === type) {
    const browser: Browser = await puppeteer();
    const page: Page = await browser.newPage();
    page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(name, {
      waitUntil: 'networkidle0',
      timeout: 0,
    });
    await page.waitFor(WAIT_TIME);

    await page.evaluate(scrollToBottom);

    await page.waitFor(WAIT_TIME * 2);
    const html = await page.evaluate(getHtml);
    temp = util.getDownloadList(html);
    await browser.close();
  }
  ctx.state.data = temp;
};
export default tuHao;
