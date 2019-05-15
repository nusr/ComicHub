const puppeteer = require('../../utils/puppeteer');

describe('puppeteer', () => {
  it('puppeteer run', async () => {
    const browser = await puppeteer();
    const page = await browser.newPage();
    await page.goto('https://github.com/nusr/comic-downloader', {
      waitUntil: 'domcontentloaded',
    });

    // eslint-disable-next-line no-undef
    const html = await page.evaluate(() => document.body.innerHTML);
    expect(html.length).toBeGreaterThan(0);

    await browser.close();
  }, 10000);
});
