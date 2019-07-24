import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { BookInfo } from './type';
import { pdfSupportImage } from '../shared';

function getBookInfo(dirName: string, extName: string = 'pdf'): BookInfo {
  const outputPath = `${dirName}.${extName}`;
  const files: string[] = fs.readdirSync(dirName);

  const bookTitle: any = _.last(_.split(dirName, '/'));
  const filePathList: string[] = [];
  files.forEach((fileName: string) => {
    const filePath = path.join(dirName, fileName);
    const temp = path.extname(filePath);
    if (pdfSupportImage.includes(temp)) {
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
