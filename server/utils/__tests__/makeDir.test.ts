import fs from 'fs';
import makeDir from '../makeDir';

describe('makeDir', () => {
  it('makeDir tmp/makeDir', () => {
    const dirPath = 'tmp/makeDir';
    makeDir(dirPath);
    expect(fs.existsSync(dirPath)).toBe(true);
  });
});
