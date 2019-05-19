import md5Test from './md5';

describe('md5', () => {
    it('md5 comic-downloader', () => {
        expect(md5Test('comic-downloader')).toBe('a1681e1524cb9a983ab4781ffa393036');
    });
    it('md5 empty content', () => {
        expect(md5Test('')).toBe('d41d8cd98f00b204e9800998ecf8427e');
    });
});
