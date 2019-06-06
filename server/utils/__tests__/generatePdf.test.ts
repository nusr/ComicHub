import path from 'path';
import fs from 'fs';
import generatePdf from '../generatePdf';

describe('generatePdf', () => {
    it('generatePdf should create pdf success', () => {
        const testPath: string = path.join(__dirname, '../../routes');
        generatePdf(testPath);
        expect(fs.existsSync(`${testPath}.pdf`)).toBe(true);
    });

    it('generatePdf should create pdf fail', () => {
        const testPath = 'test';
        generatePdf(testPath);
        expect(fs.existsSync(`${testPath}.pdf`)).toBe(false);
    });
});
