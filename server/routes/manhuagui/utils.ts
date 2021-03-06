import urlModule from 'url';
import cheerio from 'cheerio';
import urlConfig from '../../shared/urlConfig';
import { IChapterItem, ISearchItem } from '../../type';
import toNum from '../../utils/toNum';

const baseUrl = urlConfig.manhuagui.base;
const fixTitle = (value: string): string => {
  if (value) {
    return value.slice(3);
  }
  return '';
};
function getSearchList(data: string): ISearchItem[]{
  const $ = cheerio.load(data);
  const result: ISearchItem[] = [];
  const list = $('.book-result>ul>li');
  list.each((i, item) => {
    const dom = $(item)
      .find('.book-detail > dl > dt')
      .eq(0);
    const linkDom = dom.find('a').eq(0);
    const url = urlModule.resolve(baseUrl, linkDom.attr('href'));
    const title = dom.text();
    const area = $(item)
      .find('div.book-detail > dl > dd:nth-child(3) > span:nth-child(2)')
      .eq(0)
      .text();
    const author = $(item)
      .find('div.book-detail > dl > dd:nth-child(4) > span')
      .eq(0)
      .text();
    const introduce = $(item)
      .find('div.book-detail > dl > dd.intro > span')
      .eq(0)
      .text();
    const category = $(item)
      .find('div.book-detail > dl > dd:nth-child(3) > span:nth-child(3)')
      .eq(0)
      .text();
    const cover = $(item)
      .find('div.book-cover > a > img')
      .eq(0)
      .attr('src');
    result.push({
      url,
      title,
      area: fixTitle(area),
      author: fixTitle(author),
      introduce: fixTitle(introduce),
      category: fixTitle(category),
      cover,
    });
  });
  return result;
}

const getChapterList = (data: string): IChapterItem[] => {
  const $ = cheerio.load(data);
  const chapters: IChapterItem[] = [];
  $('.chapter-list > ul >li').each((i, item) => {
    const dom = $(item)
      .find('a')
      .eq(0);
    const link = urlModule.resolve(baseUrl, dom.attr('href'));
    const page = dom
      .find('i')
      .eq(0)
      .text();
    chapters.push({
      url: link,
      title: dom.attr('title'),
      page_size: toNum(page),
    });
  });
  return chapters;
};

function getDownloadItem(data: string): string {
  const $ = cheerio.load(data);
  return $('#mangaFile').attr('src');
}

const getSearchUrl = (name: string): string =>
  `${baseUrl}/s/${encodeURIComponent(name)}.html`;
const getDownloadUrl = (name: string, page: number): string => {
  const url = name;
  if (page === 1) {
    return url;
  }
  return `${url}#p=${page}`;
};
export default {
  getChapterList,
  getSearchList,
  getSearchUrl,
  getDownloadUrl,
  getDownloadItem,
};
