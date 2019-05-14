const querystring = require('querystring');
const url = require('url');

function parseUrl(link) {
    const { query } = url.parse(link);
    return querystring.parse(query);
}

function getReferer(link) {
    const result = url.parse(link);
    return `${result.protocol}//${result.host}`;
}

module.exports = {
    parseUrl,
    getReferer,
};
