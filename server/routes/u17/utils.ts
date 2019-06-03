import cheerio from 'cheerio';
import urlConfig from '../../shared/urlConfig';
import { numToString } from '../../utils/parseUrl';

const baseUrl = urlConfig.u17.base;
import { ISearchItem, IChapterItem, IImageItem } from '../../type';

const getSearchList = (data: string): ISearchItem[] => {
    const $ = cheerio.load(data);
    const result: ISearchItem[] = [];
    const list = $('#comiclist > div > div.comiclist > ul > li');
    list.each(function() {
        const dom = $(this)
            .find('div.info > h3 > strong > a')
            .eq(0);
        const title: string = dom.attr('title');
        const url: string = dom.attr('href');
        const cover: string = $(this)
            .find('div.cover > a > img')
            .eq(0)
            .attr('src');

        const author: string = $(this)
            .find('div.info > h3 > a')
            .eq(0)
            .attr('title');
        const introduce: string = $(this)
            .find('div.info > p.text')
            .eq(0)
            .text();
        const category: string = $(this)
            .find('div.info > p.cf > i')
            .eq(0)
            .text()
            .replace(/\s/gi, '');
        if (url) {
            result.push({
                url,
                title,
                cover,
                author,
                introduce: introduce.slice(3),
                category,
            });
        }
    });
    return result;
};

const getChapterList = (data: string): IChapterItem[] => {
    const $ = cheerio.load(data);
    const chapters: IChapterItem[] = [];
    $('#chapter>li').each(function() {
        const dom = $(this)
            .find('a')
            .eq(0);
        const link: string = dom.attr('href');
        const title: string = dom.attr('title');
        const innerText: string = $(this).text();
        const pageString: string = innerText.slice(dom.text().length);
        const currentPage = Number(pageString.match(/(\d+)/gi)[0]);
        const titleLen: number = title.length;
        if (link) {
            chapters.push({
                url: link,
                title: title
                    .slice(0, titleLen > 11 ? titleLen - 11 : titleLen)
                    .trim(),
                page_size: currentPage,
            });
        }
    });
    return chapters;
};

const getDownloadList = (data: string): IImageItem[] => {
    const result: IImageItem[] = [];
    const $ = cheerio.load(data);
    let page = 1;
    $('#readvip > .mg_auto').each(function() {
        const dom = $(this)
            .find('img.cur_pic.lazyload')
            .eq(0);
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
};

function getSearchUrl(name: string): string {
    return `http://so.u17.com/all/${encodeURIComponent(name)}/m0_p1.html`;
}

export default {
    getChapterList,
    getSearchList,
    getSearchUrl,
    getDownloadList,
};
