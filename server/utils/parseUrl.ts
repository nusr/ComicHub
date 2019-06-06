import url from 'url';
import _ from 'lodash';

const maxLength = 5;

function getReferer(link: string): string {
    const result = url.parse(link);
    return `${result.protocol || ''}//${result.host || ''}`;
}

function filterIllegalPath(filePath: string): string {
    const result = filePath.replace(/[^\da-z\u4e00-\u9fa5]/gi, '');
    return result;
}

function numToString(num: number): string {
    if (!_.isNumber(num)) {
        return '';
    }
    const temp: number = maxLength - num.toString().length;
    if (temp <= 0) {
        return num.toString();
    }
    const zero = new Array(temp).fill(0)
        .join('');
    return `${zero}${num}`;
}

function getComicSite(url: string): string {
    const temp: string[] = url.split('.');
    temp.pop();
    return _.last(temp) || '';
}
export {
    getReferer, filterIllegalPath, numToString, getComicSite,
};
