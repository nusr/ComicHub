/* eslint-disable */
const renderDate = (date: number): string => {
    if (date) {
        return new Date(date).toLocaleString();
    }
    return '';
};
export const searchColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: '名称',
        dataIndex: 'title',
    },
    {
        title: '作者',
        dataIndex: 'author',
    },
    {
        title: '链接',
        dataIndex: 'url',
    },

    {
        title: '地区',
        dataIndex: 'area',
    },
    {
        title: '分类',
        dataIndex: 'category',
    },
    {
        title: '封面',
        dataIndex: 'cover',
    },
    {
        title: '爬取时间',
        dataIndex: 'create_time',
        render: renderDate,
    },
];
export const chapterColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: '章节名',
        dataIndex: 'title',
    },
    {
        title: '链接',
        dataIndex: 'url',
    },
    {
        title: '章节图片数量',
        dataIndex: 'page_size',
    },
    {
        title: '爬取时间',
        dataIndex: 'create_time',
        render: renderDate,
    },
];
export const typeConfig = {
    search: 'search',
    chapter: 'chapter',
    download: 'images',
    downloadAll: 'downloadAll',
};
