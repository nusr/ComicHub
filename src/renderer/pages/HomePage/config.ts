export const renderDate = (date: number): string => {
    if (date) {
        return new Date(date).toLocaleString();
    }
    return '';
};

export const typeConfig = {
    search: 'search',
    chapter: 'chapter',
    download: 'images',
    downloadAll: 'downloadAll',
};
