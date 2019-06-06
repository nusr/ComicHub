import fs from 'fs';
import PdfDoc from 'pdfkit';
import logger from './logger';
import configData from '../shared/config';
import getBookInfo from './bookInfo';
import { BookInfo } from './type';

function generatePdf(dirName: string) {
    if (!dirName) {
        logger.info('下载路径为空！');
        return;
    }
    if (!fs.existsSync(dirName)) {
        logger.info('下载路径为不存在！');
        return;
    }

    const { outputPath, filePathList = [], bookTitle }: BookInfo = getBookInfo(
        dirName,
        'pdf',
    );

    if (filePathList.length === 0) {
        logger.info('内容为空！');
    }
    const pdf: any = new PdfDoc();
    pdf.pipe(fs.createWriteStream(outputPath));

    pdf.info.Title = bookTitle;
    pdf.info.Author = configData.bookConfig.author;

    for (let i = 0; i < filePathList.length; i += 1) {
        const item = filePathList[i];
        const temp = fs.readFileSync(item);

        pdf.image(temp, {
            width: configData.bookConfig.imgWidth,
            align: 'center',
            valign: 'center',
        });
        logger.info(`[Add Image Success] ${item}`);
        if (i !== filePathList.length - 1) {
            pdf.addPage();
        }
    }
    pdf.end();
    logger.info(outputPath);
    logger.info('Generate Pdf Success\nDone!');
    return outputPath;
}

export default generatePdf;
