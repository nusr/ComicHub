import EpubGen from 'epub-gen';
import _ from 'lodash';
import logger from './logger';
import configData from '../shared/config';
import getBookInfo from './bookInfo';
import { BookInfo } from '../type/utils';

function generateEpub(dirName: string) {
    if (!dirName) {
        logger.info('下载路径为空！');
        return;
    }
    const {
        outputPath,
        filePathList,
        bookTitle
    }: BookInfo = getBookInfo(dirName, 'epub');
    const content = filePathList.map(item => {
        return {
            data: `<img src="${item}" alt="comic"/>`
        };
    });

    const option = {
        title: bookTitle,
        author: configData.bookConfig.author,
        publisher: configData.bookConfig.author,
        cover: _.first(filePathList),
        css: configData.bookConfig.imgCss,
        verbose: true,
        content
    };
    new EpubGen(option, outputPath);// eslint-disable-line
}


export default generateEpub;
