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

export default {
    parseUrl,
    getReferer,
};
