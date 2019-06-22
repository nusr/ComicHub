import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import logger from './logger';
import makeDir from './makeDir';
import config, { pdfSupportImage } from '../shared';
import axios from './axios';
import { getComicSite } from './parseUrl';

export function getExtName(url: string): string {
    const extName = path.extname(url);
    const result = extName.match(/^\.\w+/gi);
    return _.head(result) || '';
}

export function checkExtName(filePath: string): boolean {
    const parseDir = path.parse(filePath);
    return pdfSupportImage.includes(parseDir.ext);
}

function downloadImage(
    url: string,
    fileName: string,
    referer: string = 'https://www.manhuagui.com',
): Promise<any> {
    return new Promise(((resolve) => {
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
        // 已经下载的图片不再下载
        // if (fs.existsSync(filePath)) {
        //     resolve(filePath);
        //     return;
        // }
        const parseDir = path.parse(filePath);
        makeDir(parseDir.dir);
        const stream = fs.createWriteStream(filePath);
        stream.on('finish', () => {
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
        }).then((response) => {
            response.data.pipe(stream);
        });
    }));
}

export default downloadImage;
