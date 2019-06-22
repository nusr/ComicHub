import { getExtName } from '../downloadImage';

describe('getExtName', () => {
    it('getExtName should return right result', () => {
        expect(getExtName('nusr.com.webp')).toBe('.webp');
        expect(getExtName('test.png')).toBe('.png');
        expect(getExtName('test/test.jpeg')).toBe('.jpeg');
        expect(getExtName('test/test/test/test.jpeg')).toBe('.jpeg');
    });
    it('getExtName should return empty', () => {
        expect(getExtName('')).toBe('');
        expect(getExtName('test')).toBe('');
        expect(getExtName('test/test/test/test.')).toBe('');
    });
});
