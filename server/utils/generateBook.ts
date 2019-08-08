import path from 'path';
import { IChapterMysql, ISearchMysql } from '../type';
import configData from '../shared';
import generatePdf from './generatePdf';
import logger from './logger';
import { getComicSite, getReferer, numToString } from './parseUrl';
import downloadImage, { checkExtName } from './downloadImage';
import convertImage from './convertImage';

interface DownloadItem {
  url: string;
  fileName: string;
}
const getBookDir = (
  searchItem: ISearchMysql,
  chapterItem: IChapterMysql,
): string => `${searchItem.title}/${chapterItem.title}`;

function formatDownloadPath<T>(
  dataResult: JsObject[],
  searchItem: ISearchMysql,
  chapterItem: IChapterMysql,
): DownloadItem[]{
  const dirPath: string = getBookDir(searchItem, chapterItem);
  return dataResult.map((item: JsObject): DownloadItem => ({
    url: item.url,
    fileName: `${dirPath}/${numToString(item.page)}`,
  }));
}

async function makeBook(
  results: JsObject[],
  searchItem: ISearchMysql,
  chapterItem: IChapterMysql,
  requestName: string,
): Promise<string> {
  const downloadList = formatDownloadPath(results, searchItem, chapterItem);
  const requestUrl = getReferer(requestName);
  for (const item of downloadList) {
    try {
      const filePath: string = await downloadImage(
        item.url,
        item.fileName,
        requestUrl,
      );
      if (!checkExtName(filePath)) {
        logger.info(filePath);
        const result: JsObject = await convertImage(filePath);
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
