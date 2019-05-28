import url from 'url';
import querystring from 'querystring';

function parseUrl(link: string): any {
    const { query } = url.parse(link);
    return querystring.parse(query);
}

function getReferer(link: string): string {
    const result = url.parse(link);
    return `${result.protocol}//${result.host}`;
}

function filterIllegalPath(filePath: string): string {
    let result = filePath.replace(/[^\da-z\u4e00-\u9fa5]/gi, '');
    return result;
}

export default {
    parseUrl,
    getReferer,
    filterIllegalPath
};
