import * as Koa from 'koa';
import util from './utils';
import axios from '../../utils/axios';
import { apiType } from '../../shared';
import { IRequestData } from '../../type';
import puppeteer from '../../utils/puppeteer';

const WAIT_TIME = 1000;
const tuHao = async (ctx: Koa.BaseContext) => {
    const { type, name }: IRequestData = ctx.request.body;
    let temp: any;
    if (apiType.search === type) {
        const response = await axios.get(util.getSearchUrl(name));
        temp = util.getSearchList(response.data);
    }
    if (apiType.chapter === type) {
        const response = await axios.get(name);
        temp = util.getChapterList(response.data);
    }
    if (apiType.download === type) {
        const browser = await puppeteer();
        const page = await browser.newPage();
        page.setViewport({
            width: 1366,
            height: 768,
        });
        await page.goto(name, {
            waitUntil: 'networkidle0',
            timeout: 0,
        });
        await page.waitFor(WAIT_TIME);

        await page.evaluate(() => {
            // @ts-ignore
            let lastScrollTop: number = document.scrollingElement.scrollTop;

            function scroll() {
                // @ts-ignore
                document.scrollingElement.scrollTop += 200;
                // @ts-ignore
                if (document.scrollingElement.scrollTop !== lastScrollTop) {
                    // @ts-ignore
                    lastScrollTop = document.scrollingElement.scrollTop;
                    requestAnimationFrame(scroll);
                }
            }
            scroll();
        });

        await page.waitFor(WAIT_TIME * 2);
        // @ts-ignore
        const html = await page.evaluate(() => document.querySelector('html').innerHTML);
        temp = util.getDownloadList(html);
        await browser.close();
    }
    ctx.state.data = temp;
};
export default tuHao;
