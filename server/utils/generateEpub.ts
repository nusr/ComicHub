import EpubGen from 'epub-gen';
import _ from 'lodash';
import logger from './logger';
import configData from '../shared/config';
import getBookInfo from './bookInfo';
import { BookInfo } from '../type/utils';
import fs from 'fs';

async function generateEpub(dirName: string) {
    if (!dirName) {
        logger.info('下载路径为空！');
        return;
    }

    if (!fs.existsSync(dirName)) {
        logger.info('下载路径为不存在！');
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
        content,
        verbose: process.env.NODE_ENV !== 'test'
    };
    // @ts-ignore
    await new EpubGen(option, outputPath);
}

export default generateEpub;
