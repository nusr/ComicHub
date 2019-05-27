import makeDir from './makeDir';
import fs from 'fs';

describe('makeDir', () => {
    it('makeDir empty path', () => {
        expect(makeDir('')).toBe(false);
    });
    it('makeDir tmp/makeDir', () => {
        const dirPath = 'tmp/makeDir';
        makeDir(dirPath);
        expect(fs.existsSync(dirPath)).toBe(false);
    });
});
