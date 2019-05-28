import url from 'url';

function getReferer(link: string): string {
    const result = url.parse(link);
    return `${result.protocol || ''}//${result.host || ''}`;
}

function filterIllegalPath(filePath: string): string {
    let result = filePath.replace(/[^\da-z\u4e00-\u9fa5]/gi, '');
    return result;
}

export default {
    getReferer,
    filterIllegalPath
};
