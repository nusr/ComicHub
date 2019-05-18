import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import logger from '../utils/logger';
import makeDir from '../utils/makeDir';
import config from '../shared/config';
import axios from './axios';
import imageConverter from 'webp-converter';

const getComicSite = (url: string): string => {
    const temp = url.split('.');
    temp.pop();
    return temp.pop();
};
const getExtName = (url: string): string => {
    const extName = path.extname(url);
    return extName.match(/^\.\w+/gi)[0];
};

function downloadImage(
    url: string,
    fileName: string,
    referer: string = 'https://www.manhuagui.com'
): void {
    const extName = getExtName(url);
    const filePath = path.join(
        config.downloadBase,
        getComicSite(referer),
        fileName + extName
    );
    const parseDir = path.parse(filePath);
    makeDir(parseDir.dir);
    const stream = fs.createWriteStream(filePath);
    // 转义链接中的中文参数
    const realUrl = encodeURI(url);
    axios({
        url: realUrl,
        responseType: 'stream',
        headers: {
            Referer: referer,
            'User-Agent': config.userAgent,
        },
    }).then(response => {
        response.data.pipe(stream);
    });
    stream.on('finish', () => {
        if (config.convertImageExtname.includes(parseDir.ext)) {
            const jpgPath = path.join(parseDir.dir, `${parseDir.name}.jpg`);
            sharp(filePath)
                .jpeg()
                .toFile(jpgPath)
                .catch((error: Error) => {
                    if (error) {
                        logger.error(error);
                        imageConverter.dwebp(
                            filePath,
                            jpgPath,
                            '-o',
                            (convertError: Error) => {
                                logger.error(convertError);
                            }
                        );
                    }
                });
        }
    });
}

export default downloadImage;
