import cheerio from 'cheerio';
import urlModule from 'url';
import urlConfig from '../../shared/urlConfig';

const baseUrl = urlConfig.tohomh123.base;
import { ISearchItem, IChapterItem, IImageItem } from '../../type';

const getSearchList = (data: string) => {
  const $ = cheerio.load(data);
  const result: ISearchItem[] = [];
  const list = $('ul.mh-list > li');
  list.each(function() {
    const dom = $(this)
      .find('h2.title>a')
      .eq(0);
    const title = dom.text();
    const url = urlModule.resolve(baseUrl, dom.attr('href'));
    if (url) {
      result.push({
        url,
        title,
      });
    }
  });
  return result;
};

const getChapterList = (data: string) => {
  const $ = cheerio.load(data);
  const chapters: IChapterItem[] = [];
  $('#chapterlistload li').each(function() {
    const dom = $(this)
      .find('a')
      .eq(0);
    const link = urlModule.resolve(baseUrl, dom.attr('href'));
    const page = dom
      .find('span')
      .eq(0)
      .text();
    const title = dom.text();
    const realTitle = title.slice(0, title.length - page.length);
    const currentPage = +page.match(/(\d+)/gi)[0];
    if (link) {
      chapters.push({
        url: link,
        title: realTitle,
        page_size: currentPage,
      });
    }
  });
  return chapters;
};

function fixNum(num: number): string {
  if (num < 10) {
    return `000${num}`;
  } else if (num < 100) {
    return `00${num}`;
  } else if (num < 1000) {
    return `0${num}`;
  } else {
    return num.toString();
  }
}

function getDownloadItem(data: string, pageSize: number) {
  const link = data.match(/var pl = '([\s\S]*)';\s*var bqimg/)[1];
  const result: IImageItem[] = [];
  const fileName = link.split('/').pop();
  const extName = fileName.split('.').pop();
  const baseUrl = link.slice(0, link.length - fileName.length);
  for (let i = 1; i < pageSize; i++) {
    result.push({
      page: i,
      url: `${baseUrl}${fixNum(i - 1)}.${extName}`,
    });
  }
  return result;
}

const getSearchUrl = (name: string): string =>
  `${baseUrl}/action/Search?keyword=${encodeURIComponent(name)}`;
const getDownloadUrl = (name: string, page: number): string => {
  const url = name;
  if (page === 1) {
    return url;
  } else {
    return `${url}#p=${page}`;
  }
};
export default {
  getChapterList,
  getSearchList,
  getSearchUrl,
  getDownloadUrl,
  getDownloadItem,
};
