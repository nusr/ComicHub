import urlModule from 'url';
import cheerio from 'cheerio';
import urlConfig from '../../shared/urlConfig';
import { IChapterItem, ISearchItem } from '../../type';

const baseUrl = urlConfig.manhuagui.base;
const fixTitle = (value: string): string => {
    if (value) {
        return value.slice(3);
    }
    return '';
};
const getSearchList = (data: string) => {
    const $ = cheerio.load(data);
    const result: ISearchItem[] = [];
    const list = $('.book-result>ul>li');
    list.each(function () {
        const dom = $(this)
            .find('.book-detail > dl > dt')
            .eq(0);
        const linkDom = dom.find('a').eq(0);
        const url = urlModule.resolve(baseUrl, linkDom.attr('href'));
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
        const cover = $(this)
            .find('div.book-cover > a > img')
            .eq(0)
            .attr('src');
        if (url) {
            result.push({
                url,
                title,
                area: fixTitle(area),
                author: fixTitle(author),
                introduce: fixTitle(introduce),
                category: fixTitle(category),
                cover,
            });
        }
    });
    return result;
};

const getChapterList = (data: string) => {
    const $ = cheerio.load(data);
    const chapters: IChapterItem[] = [];
    $('.chapter-list > ul >li').each(function () {
        const dom = $(this)
            .find('a')
            .eq(0);
        const link = urlModule.resolve(baseUrl, dom.attr('href'));
        const page = dom
            .find('i')
            .eq(0)
            .text();
        if (link) {
            chapters.push({
                url: link,
                title: dom.attr('title'),
                page_size: parseInt(page, 10),
            });
        }
    });
    return chapters;
};

function getDownloadItem(data: string) {
    const $ = cheerio.load(data);
    const src = $('#mangaFile').attr('src');
    return src;
}

const getSearchUrl = (name: string): string => `${baseUrl}/s/${encodeURIComponent(name)}.html`;
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
