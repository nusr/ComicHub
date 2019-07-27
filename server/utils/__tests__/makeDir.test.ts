import fs from 'fs';
import makeDir from '../makeDir';

describe('makeDir', () => {
  it('makeDir should make directory success', () => {
    expect(makeDir('')).toBeFalsy()
    expect(fs.existsSync('')).toBeFalsy()

    expect(makeDir('type')).toBeTruthy()
    expect(fs.existsSync('type')).toBeTruthy();

    makeDir('tmp/makeDir');
    expect(fs.existsSync('tmp/makeDir')).toBeTruthy();
  });
});
