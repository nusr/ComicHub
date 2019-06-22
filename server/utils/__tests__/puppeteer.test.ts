import Puppeteer from '../puppeteer';

const DELAY_TIME: number = 100000;
describe('puppeteer', () => {
    it('puppeteer run success', async () => {
        const browser = await Puppeteer();
        const page = await browser.newPage();
        await page.goto('https://github.com/nusr/ComicHub', {
            waitUntil: 'domcontentloaded',
        });
        // @ts-ignore
        const html = await page.evaluate(() => document.body.innerHTML);
        expect(html.length).toBeGreaterThan(0);

        await browser.close();
    }, DELAY_TIME);
});
