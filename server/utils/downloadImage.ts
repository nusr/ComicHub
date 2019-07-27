import fs from 'fs';
import path from 'path';
import logger from './logger';
import makeDir from './makeDir';
import config, { pdfSupportImage, sharpConvertType } from '../shared';
import axios from './axios';
import { getComicSite } from './parseUrl';

export const checkSharpExtName = (extName: string): boolean => sharpConvertType.includes(extName);

export function getExtName(url: string): string {
  let result = path.extname(url);
  if (checkSharpExtName(result)) {
    return result;
  }
  result = ''
  const list: string[] = url.split('/');
  for (let i = list.length - 1; i >= 0; i -= 1) {
    const extName = path.extname(list[i]);
    if (checkSharpExtName(extName)) {
      result = extName;
    }
  }
  return result;
}

export function checkExtName(filePath: string): boolean {
  const parseDir = path.parse(filePath);
  return pdfSupportImage.includes(parseDir.ext);
}

function downloadImage(
  url: string,
  fileName: string,
  referer: string = 'https://www.manhuagui.com',
): Promise<string> {
  return new Promise(resolve => {
    const extName = getExtName(url);
    if (!extName) {
      resolve('');
      return;
    }
    const filePath = path.join(
      config.downloadBase,
      getComicSite(referer),
      fileName + extName,
    );
    const parseDir = path.parse(filePath);
    makeDir(parseDir.dir);
    const stream = fs.createWriteStream(filePath);
    stream.on('finish', (): void => {
      logger.info(`[Download Image Success] ${filePath}`);
      resolve(filePath);
    });
    // 转义链接中的中文参数
    const realUrl = encodeURI(url);
    axios({
      url: realUrl,
      responseType: 'stream',
      headers: {
        Referer: referer,
        'User-Agent': config.userAgent,
      },
    }).then((response: JsObject): void => {
      response.data.pipe(stream);
    });
  });
}

export default downloadImage;
