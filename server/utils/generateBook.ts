import path from 'path';
import { IChapterMysql, ISearchMysql } from '../type';
import configData from '../shared';
import generatePdf from './generatePdf';
import { getComicSite, getReferer, numToString } from './parseUrl';
import sleep from './wait';
import downloadImage from './downloadImage';

const CONVERT_DELAY: number = 100;

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
        await downloadImage(item.url, item.fileName, requestUrl);
        await sleep(CONVERT_DELAY * 2);
    }
    // 等待下载图片的转换
    // FIXME 可能出现图片尚未转换完成，PDF 已经生成了
    await sleep(CONVERT_DELAY * 15);
    const dirPath: string = getBookDir(searchItem, chapterItem);
    const realPath = path.join(
        configData.downloadBase,
        getComicSite(requestUrl),
        dirPath,
    );
    return generatePdf(realPath);
}

export default makeBook;
