import cheerio from 'cheerio';
import urlModule from 'url';
import urlConfig from '../../shared/urlConfig';

const baseUrl = urlConfig.tohomh123.base;
import { ISearchItem, IChapterItem, IImageItem } from '../../type';

const numToString = (num: number): string => {
    if (num < 10) {
        return `000${num}`;
    } else if (num < 100) {
        return `00${num}`;
    } else if (num < 1000) {
        return `0${num}`;
    } else {
        return num.toString();
    }
};
const getCoverUrl = (style: string): string => {
    const temp: string = style.match(/(\([\s\S]*\))/)[0];
    return temp.slice(1, -1);
};
const getSearchList = (data: string) => {
    const $ = cheerio.load(data);
    const result: ISearchItem[] = [];
    const list = $('ul.mh-list > li');
    list.each(function() {
        const dom = $(this)
            .find('h2.title>a')
            .eq(0);
        const title: string = dom.text();
        const url: string = urlModule.resolve(baseUrl, dom.attr('href'));
        const cover: string = $(this)
            .find('.mh-cover')
            .eq(0)
            .attr('style');
        const realCover: string = getCoverUrl(cover);
        if (url) {
            result.push({
                url,
                title,
                cover: realCover,
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
        const link: string = urlModule.resolve(baseUrl, dom.attr('href'));
        const pageString: string = dom
            .find('span')
            .eq(0)
            .text();
        const title: string = dom.text();
        const realTitle: string = title.slice(0, title.length - pageString.length);
        const currentPage = Number(pageString.match(/(\d+)/gi)[0]);
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

function getDownloadItem(data: string, pageSize: number) {
    const link: string = data.match(/var pl = '([\s\S]*)';\s*var bqimg/)[1];
    const result: IImageItem[] = [];
    const fileName: string = link.split('/').pop();
    const extName: string = fileName.split('.').pop();
    const baseUrl: string = link.slice(0, link.length - fileName.length);
    for (let i = 1; i < pageSize; i++) {
        result.push({
            page: i,
            url: `${baseUrl}${numToString(i - 1)}.${extName}`,
        });
    }
    return result;
}

function getSearchUrl(name: string): string {
    return `${baseUrl}/action/Search?keyword=${encodeURIComponent(name)}`;
}

function getDownloadUrl(name: string, page: number): string {
    const url: string = name;
    if (page === 1) {
        return url;
    } else {
        return `${url}#p=${page}`;
    }
}
export default {
    getChapterList,
    getSearchList,
    getSearchUrl,
    getDownloadUrl,
    getDownloadItem,
};
