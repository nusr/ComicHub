const axios = require('./axios');
const config = require('../shared/config');
const fs = require('fs');
const md5 = require('./md5');
const path = require('path');
const webp = require('webp-converter');
const sharp = require('sharp');
const logger = require('../utils/logger');
const makeDir = require('../utils/makeDir');
const getComicSite = (url) => {
    const temp = url.split('.');
    temp.pop();
    return temp.pop();
};
const getExtName = (url) => {
    const extName = path.extname(url);
    return extName.match(/^\.\w+/gi)[0];
};

function downloadImage(url, fileName, referer = 'https://www.manhuagui.com') {
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
    }).then((response) => {
        response.data.pipe(stream);
    });
    stream.on('finish', () => {
        if (config.convertImageExtname.includes(parseDir.ext)) {
            const jpgPath = path.join(parseDir.dir, `${parseDir.name}.jpg`);
            sharp(filePath)
                .jpeg()
                .toFile(jpgPath)
                .catch((error) => {
                    logger.error(error);
                });
            /* webp.dwebp(filePath, jpgPath, '-o', (error) => {
                 logger.error(error);
             });*/
        }
    });
}

module.exports = downloadImage;
