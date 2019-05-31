import { IChapterMysql, ISearchMysql } from '../type';
import configData from '../shared/config';
import generatePdf from './generatePdf';
import generateEpub from './generateEpub';
import { getReferer, numToString } from './parseUrl';
import sleep from './wait';
import downloadImage from './downloadImage';

const getBookDir = (
    searchItem: ISearchMysql,
    chapterItem: IChapterMysql
): string => `${searchItem.title}/${chapterItem.title}`;

const generateBook = (
    searchItem: ISearchMysql,
    chapterItem: IChapterMysql
) => {
    const dirPath: string = getBookDir(searchItem, chapterItem);
    if (configData.bookConfig.bookType === 'pdf') {
        generatePdf(dirPath);
    } else {
        generateEpub(dirPath);
    }
};

function formatDownloadPath(
    dataResult: any,
    searchItem: ISearchMysql,
    chapterItem: IChapterMysql
) {
    const dirPath: string = getBookDir(searchItem, chapterItem);
    return dataResult.map((item: any): any => {
        return {
            url: item.url,
            fileName: `${dirPath}/${numToString(item.page)}`
        };
    });
}

async function makeBook(
    results: any, searchItem: ISearchMysql,
    chapterItem: IChapterMysql, requestName: string
) {
    const downloadList = formatDownloadPath(
        results,
        searchItem,
        chapterItem
    );
    for (const item of downloadList) {
        await sleep(200);
        downloadImage(
            item.url,
            item.fileName,
            getReferer(requestName)
        );
    }
    generateBook(searchItem, chapterItem);
}

export default makeBook;
