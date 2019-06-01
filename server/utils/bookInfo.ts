import fs from 'fs';
import path from 'path';
import configData from '../shared/config';
import _ from 'lodash';

import { BookInfo } from '../type/utils';
import logger from './logger';

function getBookInfo(dirName: string, extName: string = 'pdf'): BookInfo {
    const outputPath = `${dirName}.${extName}`;

    const files: string[] = fs.readdirSync(dirName);

    const bookTitle: any = _.last(_.split(dirName, '/'));
    const filePathList: string[] = [];
    files.forEach((fileName: string) => {
        const filePath = path.join(dirName, fileName);
        const extName = path.extname(filePath);
        const list: string[] = configData.pdfSupportImage;
        if (list.includes(extName)) {
            filePathList.push((filePath));
        }
    });
    return {
        outputPath,
        filePathList,
        bookTitle
    };
}

export default getBookInfo;
