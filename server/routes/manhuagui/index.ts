import axios from '../../utils/axios';
import util from './utils';
import configData from '../../shared/config';
import puppeteer from '../../utils/puppeteer';
import * as Koa from 'koa';
import { IRequestData } from '../../type';

const delay = 10000;
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
        let pageIndex = 1;
        const browser = await puppeteer();
        const page = await browser.newPage();
        page.setViewport({ width: 1366, height: 768 });
        await page.goto(name, {
            waitUntil: 'networkidle0',
        });
        const html = await page.evaluate(() => document.querySelector('html').innerHTML);
        const imageSrc = util.getDownloadItem(html);
        temp.push({
            page: pageIndex,
            url: imageSrc,
        });
        pageIndex += 1;
        for (; pageIndex <= page_size; pageIndex += 1) {
            const nextItem = await page.$('#next');
            nextItem.click();
            await page.waitFor(500);
            const html = await page.evaluate(() => document.querySelector('html').innerHTML);
            const imageSrc = util.getDownloadItem(html);
            temp.push({
                page: pageIndex,
                url: imageSrc,
            });
        }
        await browser.close();
    }
    ctx.state.data = temp;
};
export default manHuaGui;
