import fs from 'fs';
import path from 'path';
import PdfDoc from 'pdfkit';
import logger from './logger';
import configData from '../shared/config';

function generatePdf(dirName: string) {
    const dirPath: string = path.resolve(__dirname, dirName);
    const pdf: any = new PdfDoc();
    const outputFile = `${dirPath}.pdf`;
    pdf.pipe(fs.createWriteStream(outputFile));


    const pdfTitle = dirPath.split('/').pop();
    pdf.info['Title'] = pdfTitle;
    pdf.info['Author'] = 'stevexugc@gmail.com';

    const files: string[] = fs.readdirSync(dirPath);
    const filesData: any = [];
    files.forEach((fileName: string) => {
        const filePath = path.join(dirPath, fileName);
        const extName = path.extname(filePath);
        if (configData.pdfSupportImage.includes(extName)) {
            filesData.push(fs.readFileSync(filePath));
        }
    });
    for (let i = 0; i < filesData.length; i += 1) {
        pdf.image(filesData[i], {
            width: 500,
            'align': 'center',
            'valign': 'center'
        });
        if (i !== filesData.length - 1) {
            pdf.addPage();
        }
    }
    pdf.end();
    logger.info(outputFile);
}

export default generatePdf;

