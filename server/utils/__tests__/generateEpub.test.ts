import generateEpub from '../generateEpub';
import path from 'path';
import fs from 'fs';


describe('generateEpub', () => {
    it('generateEpub should create epub success', async () => {
        const testPath = path.join(__dirname, '../../routes');
        await generateEpub(testPath);
        expect(fs.existsSync(`${testPath}.epub`)).toBe(true);
    });

    it('generateEpub should create epub fail', async () => {
        const testPath = 'test';
        await generateEpub(testPath);
        expect(fs.existsSync(`${testPath}.epub`)).toBe(false);
    });
});
