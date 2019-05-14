const { resolve } = require('url');
const cheerio = require('cheerio');
const urlConfig = require('../../shared/urlConfig');
const baseUrl = urlConfig.tohomh123;

const getSearchList = (data) => {
    const $ = cheerio.load(data);
    const result = [];
    const list = $('ul.mh-list > li');
    list.each(function() {
        const dom = $(this)
            .find('h2.title>a')
            .eq(0);
        const title = dom.text();
        const url = resolve(baseUrl, dom.attr('href'));
        if (url) {
            result.push({
                url,
                title,
            });
        }
    });
    return result;
};

const getChapterList = (data) => {
    const $ = cheerio.load(data);
    const chapters = [];
    $('#chapterlistload li').each(function() {
        const dom = $(this)
            .find('a')
            .eq(0);
        const link = resolve(baseUrl, dom.attr('href'));
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

function fixNum(num) {
    if (num < 10) {
        return `000${num}`;
    } else if (num < 100) {
        return `00${num}`;
    } else if (num < 1000) {
        return `0${num}`;
    } else {
        return num;
    }
}

function getDownloadItem(data, pageSize) {
    const link = data.match(/var pl = '([\s\S]*)';\s*var bqimg/)[1];
    const result = [];
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

const getSearchUrl = (name) =>
    `${baseUrl}/action/Search?keyword=${encodeURIComponent(name)}`;
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
