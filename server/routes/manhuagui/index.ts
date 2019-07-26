import * as Koa from 'koa';
import { Browser, Page, ElementHandle } from 'puppeteer';
import { IRequestData } from '../../type';
import axios from '../../utils/axios';
import util from './utils';
import { apiType } from '../../shared';
import puppeteer, { DESKTOP_WINDOW_SIZE, getHtml } from '../../utils/puppeteer';

const DELAY_TIME = 500;
let temp: JsObject[];
const manHuaGui = async (ctx: Koa.BaseContext) => {
  const { type, name, page_size: pageSize }: IRequestData = ctx.request.body;

  if (apiType.search === type) {
    const response = await axios.get(util.getSearchUrl(name));
    temp = util.getSearchList(response.data);
  }
  if (apiType.chapter === type) {
    const response = await axios.get(name);
    temp = util.getChapterList(response.data);
  }
  if (apiType.download === type) {
    temp = [];
    let pageIndex = 1;
    const browser: Browser = await puppeteer();
    const page: Page = await browser.newPage();
    page.setViewport(DESKTOP_WINDOW_SIZE);
    await page.goto(name, {
      waitUntil: 'networkidle0',
    });
    const html = await page.evaluate(
      getHtml,
    );
    const imageSrc = util.getDownloadItem(html);
    temp.push({
      page: pageIndex,
      url: imageSrc,
    });
    pageIndex += 1;
    for (; pageIndex <= pageSize; pageIndex += 1) {
      const nextItem = (await page.$('#next')) as ElementHandle;
      nextItem.click();
      await page.waitFor(DELAY_TIME);
      const otherHtml = await page.evaluate(
        getHtml,
      );
      const otherImage = util.getDownloadItem(otherHtml);
      temp.push({
        page: pageIndex,
        url: otherImage,
      });
    }
    await browser.close();
  }
  ctx.state.data = temp;
};
export default manHuaGui;
