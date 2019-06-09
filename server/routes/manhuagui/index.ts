import * as Koa from 'koa';
import { IRequestData } from '../../type';
import axios from '../../utils/axios';
import util from './utils';
import configData from '../../shared/config';
import puppeteer, { DESKTOP_WINDOW_SIZE } from '../../utils/puppeteer';

const DELAY_TIME: number = 500;
const manHuaGui = async (ctx: Koa.BaseContext) => {
    const { type, name, page_size: pageSize }: IRequestData = ctx.request.body;
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
        page.setViewport(DESKTOP_WINDOW_SIZE);
        await page.goto(name, {
            waitUntil: 'networkidle0',
        });
        // @ts-ignore
        const html = await page.evaluate(() => document.querySelector('html').innerHTML);
        const imageSrc = util.getDownloadItem(html);
        temp.push({
            page: pageIndex,
            url: imageSrc,
        });
        pageIndex += 1;
        for (; pageIndex <= pageSize; pageIndex += 1) {
            const nextItem = await page.$('#next');
            nextItem.click();
            await page.waitFor(DELAY_TIME);
            // @ts-ignore
            const otherHtml = await page.evaluate(() => document.querySelector('html').innerHTML);
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
