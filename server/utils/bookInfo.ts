import fs from 'fs';
import path from 'path';
import configData from '../shared/config';
import _ from 'lodash';

import { BookInfo } from '../type/utils';

function getBookInfo(dirName: string, extName: string = 'pdf'): BookInfo {
    const dirPath: string = path.resolve(__dirname, dirName);

    const outputPath = `${dirPath}.${extName}`;

    const files: string[] = fs.readdirSync(dirPath);

    const bookTitle: any = _.last(_.split(dirPath, '/'));
    const filePathList: string[] = [];
    files.forEach((fileName: string) => {
        const filePath = path.join(dirPath, fileName);
        const extName = path.extname(filePath);
        if (configData.pdfSupportImage.includes(extName)) {
            filePathList.push((filePath));
        }
    });
    return {
        outputPath,
        filePathList,
        dirPath,
        bookTitle
    };
}

export default getBookInfo;
