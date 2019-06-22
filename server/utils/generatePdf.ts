import fs from 'fs';
import PdfDoc from 'pdfkit';
import logger from './logger';
import { bookConfig } from '../shared';
import getBookInfo from './bookInfo';
import { BookInfo } from './type';


function generatePdf(dirName: string) {
    if (!dirName) {
        logger.error('下载路径为空！');
        return '';
    }
    if (!fs.existsSync(dirName)) {
        logger.error(`下载路径为 ${dirName}不存在！`);
        return '';
    }

    const { outputPath, filePathList = [], bookTitle }: BookInfo = getBookInfo(
        dirName,
        'pdf',
    );

    if (filePathList.length === 0) {
        logger.error('内容为空！');
    }
    const pdf: any = new PdfDoc();
    pdf.pipe(fs.createWriteStream(outputPath));

    pdf.info.Title = bookTitle;
    pdf.info.Author = bookConfig.author;

    for (let i = 0; i < filePathList.length; i += 1) {
        const item = filePathList[i];
        const temp = fs.readFileSync(item);
        try {
            pdf.image(temp, bookConfig.paddingLeft, bookConfig.paddingTop, {
                width: bookConfig.imageWidth,
                height: bookConfig.imageHeight,
                align: 'center',
                valign: 'center',
            });
            logger.info(`[Add Image Success] ${item}`);
        } catch (error) {
            logger.error(error);
        }
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
