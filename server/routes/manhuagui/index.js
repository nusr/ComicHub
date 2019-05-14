const util = require('./utils');
const axios = require('../../utils/axios');
const configData = require('../../shared/config');
const puppeteer = require('../../utils/puppeteer');
module.exports = async (ctx) => {
  const { type, name: realName, page: pageSize } = ctx.request.query;
  const name = decodeURIComponent(realName);
  let temp;
  let response;
  if (configData.typeConfig.search === type) {
    response = await axios.get(util.getSearchUrl(name));
    temp = util.getSearchList(response.data);
  }
  if (configData.typeConfig.chapter === type) {
    response = await axios.get(name);
    temp = util.getChapterList(response.data);
  }
  if (configData.typeConfig.download === type) {
    temp = [];
    const browser = await puppeteer();

    for (let i = 1; i <= pageSize; i += 1) {
      const page = await browser.newPage();
      const downloadUrl = util.getDownloadUrl(name, i);
      await page.goto(downloadUrl, {
        waitUntil: 'networkidle2',
      });
      const downloadLink = await page.evaluate(
        () => document.querySelector('#mangaFile').src
      );
      temp.push({
        page: i,
        url: downloadLink,
      });
      await page.close();
    }

    await browser.close();
  }
  ctx.state.data = temp;
};
