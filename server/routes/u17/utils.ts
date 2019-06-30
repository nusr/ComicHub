import cheerio from 'cheerio';
import _ from 'lodash';
import { IChapterItem, IImageItem, ISearchItem } from '../../type';
import toNum from '../../utils/toNum';

const getSearchList = (data: string): ISearchItem[] => {
    const $ = cheerio.load(data);
    const result: ISearchItem[] = [];
    const list = $('#comiclist > div > div.comiclist > ul > li');
    list.each((i, item) => {
        const dom = $(item)
            .find('div.info > h3 > strong > a')
            .eq(0);
        const title: string = dom.attr('title');
        const url: string = dom.attr('href');
        const cover: string = $(item)
            .find('div.cover > a > img')
            .eq(0)
            .attr('src');

        const author: string = $(item)
            .find('div.info > h3 > a')
            .eq(0)
            .attr('title');
        const introduce: string = $(item)
            .find('div.info > p.text')
            .eq(0)
            .text();
        const category: string = $(item)
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
    $('#chapter>li').each((i, item) => {
        const dom = $(item)
            .find('a')
            .eq(0);
        const link: string = dom.attr('href');
        const title: string = dom.attr('title');
        const innerText: string = $(item).text();
        const pageString: string = innerText.slice(dom.text().length);
        const currentPage = toNum(_.head(pageString.match(/(\d+)/gi)));
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
    let page:number = 1;
    $('#readvip > .mg_auto').each((i, item) => {
        const dom = $(item)
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
