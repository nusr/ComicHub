const { resolve } = require('url');
const cheerio = require('cheerio');
const urlConfig = require('../../shared/urlConfig');
const baseUrl = urlConfig.manhuagui;

const getSearchList = (data) => {
  const $ = cheerio.load(data);
  const result = [];
  const list = $('.book-result>ul>li');
  list.each(function() {
    const dom = $(this)
      .find('.book-detail > dl > dt')
      .eq(0);
    const linkDom = dom.find('a').eq(0);
    const url = resolve(baseUrl, linkDom.attr('href'));
    const title = dom.text();
    const area = $(this)
      .find('div.book-detail > dl > dd:nth-child(3) > span:nth-child(2)')
      .eq(0)
      .text();
    const author = $(this)
      .find('div.book-detail > dl > dd:nth-child(4) > span')
      .eq(0)
      .text();
    const introduce = $(this)
      .find('div.book-detail > dl > dd.intro > span')
      .eq(0)
      .text();
    const category = $(this)
      .find('div.book-detail > dl > dd:nth-child(3) > span:nth-child(3)')
      .eq(0)
      .text();
    if (url) {
      result.push({
        url,
        title,
        area,
        author,
        introduce,
        category,
      });
    }
  });
  return result;
};

const getChapterList = (data) => {
  const $ = cheerio.load(data);
  const chapters = [];
  $('.chapter-list > ul >li').each(function() {
    const dom = $(this)
      .find('a')
      .eq(0);
    const link = resolve(baseUrl, dom.attr('href'));
    const page = dom
      .find('i')
      .eq(0)
      .text();
    if (link) {
      chapters.push({
        url: link,
        title: dom.attr('title'),
        page_size: parseInt(page),
      });
    }
  });
  return chapters;
};

function getDownloadItem(data) {
  const $ = cheerio.load(data);
  const src = $('#mangaFile').attr('src');
  return src;
}

const getSearchUrl = (name) => `${baseUrl}/s/${encodeURIComponent(name)}.html`;
const getDownloadUrl = (name, page) => {
  const url = name;
  if (page === 1) {
    return url;
  } else {
    return `${url}#p=${page}`;
  }
};
module.exports = {
  getChapterList,
  getSearchList,
  getSearchUrl,
  getDownloadUrl,
  getDownloadItem,
};
