import makeDir from './makeDir';
import fs from 'fs';

describe('makeDir', () => {
    it('makeDir tmp/makeDir', () => {
        const dirPath = 'tmp/makeDir';
        makeDir(dirPath);
        expect(fs.existsSync(dirPath)).toBe(true);
    });
    it('makeDir ../downloadResult/白垩纪/不眠夜', () => {
        const dirPath = '../downloadResult/白垩纪/不眠夜';
        makeDir(dirPath);
        expect(fs.existsSync(dirPath)).toBe(true);
    });
});
