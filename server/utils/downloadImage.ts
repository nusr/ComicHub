import fs from 'fs';
import path from 'path';
import logger from './logger';
import makeDir from './makeDir';
import config from '../shared/config';
import axios from './axios';
import _ from 'lodash';
import { getComicSite } from './parseUrl';
import convertImage from './convertImage';

export function getExtName(url: string): string {
    const extName = path.extname(url);
    const result = extName.match(/^\.\w+/gi);
    return _.first(result) || '';
}

export default function downloadImage(
    url: string,
    fileName: string,
    referer: string = 'https://www.manhuagui.com'
): void {
    const extName = getExtName(url);
    if (!extName) {
        return;
    }
    const filePath = path.join(
        config.downloadBase,
        getComicSite(referer),
        fileName + extName
    );
    const parseDir = path.parse(filePath);
    logger.info(parseDir);
    makeDir(parseDir.dir);
    const stream = fs.createWriteStream(filePath);
    // 转义链接中的中文参数
    const realUrl = encodeURI(url);
    axios({
        url: realUrl,
        responseType: 'stream',
        headers: {
            Referer: referer,
            'User-Agent': config.userAgent
        }
    }).then(response => {
        response.data.pipe(stream);
    }).catch(error => {
        logger.error(error);
    });

    logger.info(`[Download Image Success] ${filePath}`);

    stream.on('finish', () => {
        if (config.pdfSupportImage.includes(parseDir.ext)) {
            return;
        }
        const jpegPath = path.join(parseDir.dir, `${parseDir.name}${config.pdfSupportImage[0]}`);
        convertImage(filePath, jpegPath);
    });
}

