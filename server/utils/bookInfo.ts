import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { BookInfo } from './type';
import configData from '../shared/config';

function getBookInfo(dirName: string, extName: string = 'pdf'): BookInfo {
    const outputPath = `${dirName}.${extName}`;
    const files: string[] = fs.readdirSync(dirName);

    const bookTitle: any = _.last(_.split(dirName, '/'));
    const filePathList: string[] = [];
    files.forEach((fileName: string) => {
        const filePath = path.join(dirName, fileName);
        const temp = path.extname(filePath);
        const list: string[] = configData.pdfSupportImage;
        if (list.includes(temp)) {
            filePathList.push(filePath);
        }
    });
    return {
        outputPath,
        filePathList,
        bookTitle,
    };
}

export default getBookInfo;
