import axios from '../../utils/axios';
import util from './utils';
import configData from '../../shared/config';
import puppeteer from '../../utils/puppeteer';
import * as Koa from 'koa';
import { IRequestData } from '../../type';

const manHuaGui = async (ctx: Koa.BaseContext) => {
  const { type, name, page_size }: IRequestData = ctx.request.body;
  let temp;
  if (configData.typeConfig.search === type) {
    const response = await axios.get(util.getSearchUrl(name));
    temp = util.getSearchList(response.data);
  }
  if (configData.typeConfig.chapter === type) {
    const response = await axios.get(name);
    temp = util.getChapterList(response.data);
  }
  if (configData.typeConfig.download === type) {
    temp = [];
    const browser = await puppeteer();
    for (let i = 1; i <= page_size; i += 1) {
      const page = await browser.newPage();
      const downloadUrl = util.getDownloadUrl(name, i);
      await page.goto(downloadUrl, {
        waitUntil: 'networkidle2',
      });
      const imageItem = await page.evaluate(() =>
        document.querySelector('#mangaFile')
      );
      temp.push({
        page: i,
        url: imageItem.src,
      });
      await page.close();
    }

    await browser.close();
  }
  ctx.state.data = temp;
};
export default manHuaGui;
