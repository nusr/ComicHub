import path from 'path';
import { IChapterMysql, ISearchMysql } from '../type';
import configData from '../shared';
import generatePdf from './generatePdf';
import logger from './logger';
import { getComicSite, getReferer, numToString } from './parseUrl';
import downloadImage, { checkExtName } from './downloadImage';
import convertImage from './convertImage';

const getBookDir = (
    searchItem: ISearchMysql,
    chapterItem: IChapterMysql,
): string => `${searchItem.title}/${chapterItem.title}`;

const formatDownloadPath = (
    dataResult: any,
    searchItem: ISearchMysql,
    chapterItem: IChapterMysql,
) => {
    const dirPath: string = getBookDir(searchItem, chapterItem);
    return dataResult.map((item: any): any => ({
        url: item.url,
        fileName: `${dirPath}/${numToString(item.page)}`,
    }));
};

async function makeBook(
    results: any,
    searchItem: ISearchMysql,
    chapterItem: IChapterMysql,
    requestName: string,
) {
    const downloadList = formatDownloadPath(results, searchItem, chapterItem);
    const requestUrl = getReferer(requestName);
    for (const item of downloadList) {
        try {
            const filePath: string = await downloadImage(item.url, item.fileName, requestUrl);
            if (!checkExtName(filePath)) {
                logger.info(filePath);
                const result: any = await convertImage(filePath);
                if (result) {
                    await convertImage(filePath);
                }
            }
        } catch (error) {
            logger.error(error);
        }
    }
    const dirPath: string = getBookDir(searchItem, chapterItem);
    const realPath = path.join(
        configData.downloadBase,
        getComicSite(requestUrl),
        dirPath,
    );
    return generatePdf(realPath);
}

export default makeBook;
