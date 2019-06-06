import path from 'path';
import { IChapterMysql, ISearchMysql } from '../type';
import configData from '../shared/config';
import generatePdf from './generatePdf';
import { getComicSite, getReferer, numToString } from './parseUrl';
import sleep from './wait';
import downloadImage from './downloadImage';

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
    // eslint-disable-next-line
    for (const item of downloadList) {
        await sleep(200);
        downloadImage(item.url, item.fileName, requestUrl);
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
