import url from 'url';
import querystring from 'querystring';
function parseUrl(link) {
    const { query } = url.parse(link);
    return querystring.parse(query);
}

function getReferer(link) {
    const result = url.parse(link);
    return `${result.protocol}//${result.host}`;
}

export default {
    parseUrl,
    getReferer,
};
