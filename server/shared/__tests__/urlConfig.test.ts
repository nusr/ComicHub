import Puppeteer from '../../utils/puppeteer';
import urlConfig from '../urlConfig';

const DELAY_TIME: number = 100000;
describe('Test Base Url', () => {
    let page: any;
    let browser: any;
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
            const arr: any = Array.prototype.slice.apply(document.querySelectorAll('img'));
            return arr.map((v: HTMLImageElement) => v.src);
        });
        expect(list.length).toBeGreaterThan(0);
    };
    Object.values(urlConfig).forEach((item) => {
        it(`base url ${item.base} should include many images`, testPage(item.base), DELAY_TIME);
    });
});
