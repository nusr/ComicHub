import cheerio from 'cheerio';
import urlModule from 'url';
import _ from 'lodash';
import { IChapterItem, IImageItem, ISearchItem } from '../../type';
import urlConfig from '../../shared/urlConfig';
import { numToString } from '../../utils/parseUrl';
import toNum from '../../utils/toNum';

const baseUrl = urlConfig.tohomh123.base;

const getCoverUrl = (style: string): string => {
  const temp: string = _.head(style.match(/(\([\s\S]*\))/)) || '';
  return temp.slice(1, -1);
};

function getSearchList(data: string): ISearchItem[] {
  const $ = cheerio.load(data);
  const result: ISearchItem[] = [];
  const list = $('ul.mh-list > li');
  list.each((i, item) => {
    const dom = $(item)
      .find('h2.title>a')
      .eq(0);
    const title: string = dom.text();
    const url: string = urlModule.resolve(baseUrl, dom.attr('href'));
    const cover: string = $(item)
      .find('.mh-cover')
      .eq(0)
      .attr('style');
    const realCover: string = getCoverUrl(cover);
    result.push({
      url,
      title,
      cover: realCover,
    });
  });
  return result;
}

const getChapterList = (data: string): IChapterItem[] => {
  const $ = cheerio.load(data);
  const chapters: IChapterItem[] = [];
  $('#chapterlistload li').each((i, item) => {
    const dom = $(item)
      .find('a')
      .eq(0);
    const link: string = urlModule.resolve(baseUrl, dom.attr('href'));
    const pageString: string = dom
      .find('span')
      .eq(0)
      .text();
    const title: string = dom.text();
    const realTitle: string = title.slice(0, title.length - pageString.length);
    const currentPage = toNum(_.head(pageString.match(/(\d+)/gi)));
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

function getDownloadItem(data: string, pageSize: number): IImageItem[] {
  const linkResult: any = data.match(/var pl = '([\s\S]*)';\s*var bqimg/);
  const [, link] = linkResult;
  if (!link) {
    return [];
  }
  const result: IImageItem[] = [];
  const fileName: string = _.last(link.split('/')) || '';
  const extName: string = _.last(fileName.split('.')) || '';
  const tempUrl: string = link.slice(0, link.length - fileName.length);
  for (let i = 0; i < pageSize; i += 1) {
    result.push({
      page: i + 1,
      url: `${tempUrl}${numToString(i)}.${extName}`,
    });
  }
  return result;
}

function getSearchUrl(name: string): string {
  return `${baseUrl}/action/Search?keyword=${encodeURIComponent(name)}`;
}

export default {
  getChapterList,
  getSearchList,
  getSearchUrl,
  getDownloadItem,
};
