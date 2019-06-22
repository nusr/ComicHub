import { getJpegPath } from '../convertImage';
import { pdfSupportImage } from '../../shared';

describe('getJpegPath', () => {
    it('getJpegPath should return right result', () => {
        expect(getJpegPath('test.webp')).toBe(`test${pdfSupportImage[0]}`);
        expect(getJpegPath('test/test.jpg')).toBe(`test/test${pdfSupportImage[0]}`);
    });
});
