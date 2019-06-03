import { getExtName } from '../downloadImage';

const testUrl =
    'https://i.hamreus.com/ps2/b/borutonaruto_abqs/第32话/001.jpg.webp?cid=431432&md5=yDHm6vRkLK_Pr9ehpPayCw';
describe('getExtName', () => {
    it('getExtName should return right result', () => {
        expect(getExtName(testUrl)).toBe('.webp');
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
