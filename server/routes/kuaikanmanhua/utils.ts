import cheerio from 'cheerio';
import _ from 'lodash';
import { IChapterItem, IImageItem, ISearchItem } from '../../type';
import urlConfig from '../../shared/urlConfig';

const baseUrl: string = urlConfig.kuaikanmanhua.base;
const getSearchList = (data: string): ISearchItem[] => {
  const $ = cheerio.load(data);
  const result: ISearchItem[] = [];
  const list = $('.resultList>.TabW184');
  list.each((i, item) => {
    const dom = $(item)
      .find('a')
      .eq(0);
    const title: string = $(item).find('.itemTitle').eq(0).text();
    const author: string = $(item).find('.author').eq(0).text();
    const url: string = baseUrl + dom.attr('href');
    const cover: string = $(item)
      .find('.img')
      .eq(0)
      .attr('data-src');
    const category: string = $(item).find('.tab').text();
    result.push({
      url,
      title,
      author: _.trim(author),
      cover,
      category,
    });
  });
  return result;
};

function getChapterList(data: string): IChapterItem[] {
  const $ = cheerio.load(data);
  const chapters: IChapterItem[] = [];
  $('.TopicList  .TopicItem').each((i, item) => {
    const dom = $(item)
      .find('.title>a')
      .eq(0);
    const url: string = baseUrl + dom.attr('href');
    const title: string = _.trim(dom.text());
    chapters.push({
      url,
      title,
    });
  });
  return chapters;
}

function getDownloadList(data: string): IImageItem[] {
  const result: IImageItem[] = [];
  const $ = cheerio.load(data);
  let page = 1;
  const others: string [] = [];
  $('.imgList>img').each((i, item) => {
    const url: string = $(item).attr('data-src');
    others.push($(item).attr('src'));
    if (url) {
      result.push({
        url,
        page,
      });
      page += 1;
    }
  });
  return result;
}

function getSearchUrl(name: string): string {
  return `${baseUrl}/s/result/${encodeURIComponent(name)}`;
}

export default {
  getChapterList,
  getSearchList,
  getSearchUrl,
  getDownloadList,
};
