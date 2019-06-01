import path from 'path';
import { IChapterMysql, ISearchMysql } from '../type';
import configData from '../shared/config';
import generatePdf from './generatePdf';
import generateEpub from './generateEpub';
import { getReferer, numToString, getComicSite } from './parseUrl';
import sleep from './wait';
import downloadImage from './downloadImage';


const getBookDir = (
    searchItem: ISearchMysql,
    chapterItem: IChapterMysql
): string => `${searchItem.title}/${chapterItem.title}`;

const formatDownloadPath = (
    dataResult: any,
    searchItem: ISearchMysql,
    chapterItem: IChapterMysql
) => {
    const dirPath: string = getBookDir(searchItem, chapterItem);
    return dataResult.map((item: any): any => {
        return {
            url: item.url,
            fileName: `${dirPath}/${numToString(item.page)}`
        };
    });
};

async function makeBook(
    results: any, searchItem: ISearchMysql,
    chapterItem: IChapterMysql, requestName: string
) {
    const downloadList = formatDownloadPath(
        results,
        searchItem,
        chapterItem
    );
    const requestUrl = getReferer(requestName);
    for (const item of downloadList) {
        await sleep(200);
        downloadImage(
            item.url,
            item.fileName,
            requestUrl
        );
    }

    const dirPath: string = getBookDir(searchItem, chapterItem);
    const realPath = path.join(
        configData.downloadBase,
        getComicSite(requestUrl),
        dirPath
    );
    const bookType: string[] = configData.bookConfig.bookType;
    if (bookType.includes('pdf')) {
        generatePdf(realPath);
    }
    if (bookType.includes('epub')) {
        await generateEpub(realPath);
    }
}

export default makeBook;
