import fs from 'fs';
import downloadImage, { getExtName, checkSharpExtName, checkExtName } from '../downloadImage';

describe('getExtName', () => {
  it('getExtName should return right result', () => {
    expect(getExtName('nusr.com.webp')).toBe('.webp');
    expect(getExtName('test.png')).toBe('.png');
    expect(getExtName('test/test.jpeg')).toBe('.jpeg');
    expect(getExtName('test/test/test/test.jpeg')).toBe('.jpeg');
    expect(getExtName('test/test/test/test.jpeg/3434/434')).toBe('.jpeg');
  });
  it('getExtName should return empty', () => {
    expect(getExtName('')).toBe('');
    expect(getExtName('test')).toBe('');
    expect(getExtName('test/test/test/test.')).toBe('');
  });
});


describe('checkSharpExtName', () => {
  it('checkSharpExtName should return right result', () => {
    expect(checkSharpExtName('.jpeg')).toBeTruthy();
    expect(checkSharpExtName('.jpg')).toBeTruthy();
    expect(checkSharpExtName('.png')).toBeTruthy();
    expect(checkSharpExtName('.webp')).toBeTruthy();
    expect(checkSharpExtName('.tiff')).toBeTruthy();
    expect(checkSharpExtName('.gif')).toBeTruthy();
    expect(checkSharpExtName('.svg')).toBeTruthy();
  });

});


describe('checkExtName', () => {
  it('checkExtName should return right result', () => {
    expect(checkExtName('test.jpeg')).toBeTruthy();
    expect(checkExtName('/fefeaa/test.jpeg')).toBeTruthy();
    expect(checkExtName('test.png')).toBeTruthy();
    expect(checkExtName('fefe/test.png')).toBeTruthy();
  });

});
describe('downloadImage', () => {
  it('downloadImage should download success', async () => {
    const filePath: string = await downloadImage('https://jestjs.io/img/jest.svg', 'jest', 'https://jestjs.io');
    expect(fs.existsSync(filePath)).toBeTruthy();
  });

});

// https://jestjs.io/img/jest.svg
