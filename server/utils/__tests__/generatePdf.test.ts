import generatePdf from '../generatePdf';
import path from 'path';
import fs from 'fs';

describe('generatePdf', () => {
    it('generatePdf should create pdf success', () => {
        const testPath = path.join(__dirname, '../../routes');
        generatePdf(testPath);
        expect(fs.existsSync(`${testPath}.pdf`)).toBe(true);
    });

    it('generatePdf should create pdf fail', () => {
        const testPath = 'test';
        generatePdf(testPath);
        expect(fs.existsSync(`${testPath}.pdf`)).toBe(false);
    });
});
