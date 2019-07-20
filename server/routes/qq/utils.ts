import cheerio from 'cheerio';
import _ from 'lodash';
import path from 'path';
import { IChapterItem, IImageItem, ISearchItem } from '../../type';
import urlConfig from '../../shared/urlConfig';

const baseUrl: string = urlConfig.qq.base;
const getSearchList = (data: string): ISearchItem[] => {
    const $ = cheerio.load(data);
    const result: ISearchItem[] = [];
    const list = $('ul.mod_book_list.mod_all_works_list > li');
    list.each((i, item) => {
        const dom = $(item)
            .find('a')
            .eq(0);
        const title: string = dom.attr('title');
        const url: string = path.join(baseUrl, dom.attr('href'));
        const cover: string = $(item)
            .find('img')
            .eq(0)
            .attr('src');
        result.push({
            url,
            title,
            cover,
        });
    });
    return result;
};

function getChapterList(data: string): IChapterItem[] {
    const $ = cheerio.load(data);
    const chapters: IChapterItem[] = [];
    $('ol.works-chapter-list  span.works-chapter-item').each((i, item) => {
        const dom = $(item)
            .find('a')
            .eq(0);
        const url: string = path.join(baseUrl, dom.attr('href'));
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
    $('#comicContain > li').each((i, item) => {
        const dom = $(item)
            .children('img').first();
        const url: string = dom.attr('src');
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
    return `${baseUrl}/Comic/searchList?search=${encodeURIComponent(name)}`;
}

export default {
    getChapterList,
    getSearchList,
    getSearchUrl,
    getDownloadList,
};
