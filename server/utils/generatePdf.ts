import fs from 'fs';
import path from 'path';
import PdfDoc from 'pdfkit';
import logger from './logger';

function generatePdf(dirName: string) {
    const dirPath: string = path.resolve(__dirname, dirName);
    logger.info(dirPath);
    const pdf: any = new PdfDoc();
    const outputFile = `${dirPath}.pdf`;
    pdf.pipe(fs.createWriteStream(outputFile));

    logger.info(outputFile);
    const pdfTitle = dirPath.split('/').pop();
    pdf.info['Title'] = pdfTitle;
    pdf.info['Author'] = 'stevexugc@gmail.com';

    const files: string[] = fs.readdirSync(dirPath);
    const filesData: any = [];
    files.forEach((fileName: string) => {
        const filePath = path.join(dirPath, fileName);
        if (path.extname(filePath) !== '.webp') {
            filesData.push(fs.readFileSync(filePath));
        }
    });
    for (let i = 0; i < filesData.length; i += 1) {
        pdf.image(filesData[i], {
            width: 500
        });
        if (i !== filesData.length - 1) {
            pdf.addPage();
        }
    }
    pdf.end();
}

// generatePdf('../../downloadResult/manhuagui/博人传BORUTO(BORUTO-NARUTO NEXT GENERATIONS- 博人传-火影忍者新生代- )/第32话');

export default generatePdf;

