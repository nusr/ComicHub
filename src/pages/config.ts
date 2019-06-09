export const renderDate = (date: number): string => {
    if (date) {
        return new Date(date).toLocaleString();
    }
    return '';
};

export const typeConfig = {
    chapter: 'chapter',
    downloadAll: 'downloadAll',
    download: 'images',
    search: 'search',
    result: 'result',
};
