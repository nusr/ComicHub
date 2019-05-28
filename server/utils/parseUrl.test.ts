import parseUrl from './parseUrl';

describe('getReferer', () => {
    it('getReferer should return right referer', () => {
        expect(parseUrl.getReferer('http://www.test.com')).toBe('http://www.test.com');
        expect(parseUrl.getReferer('http://www.test.com/11')).toBe('http://www.test.com');
        expect(parseUrl.getReferer('http://www.test.com/11/222')).toBe('http://www.test.com');
        expect(parseUrl.getReferer('https://www.test.com')).toBe('https://www.test.com');
        expect(parseUrl.getReferer('https://www.test.com/11/222')).toBe('https://www.test.com');
    });
    it('getReferer should return //', () => {
        expect(parseUrl.getReferer('test.com')).toBe('//');
        expect(parseUrl.getReferer('www.test.com/11')).toBe('//');
        expect(parseUrl.getReferer('11')).toBe('//');
        expect(parseUrl.getReferer('aa')).toBe('//');
        expect(parseUrl.getReferer('////')).toBe('//');
    });
});

describe('filterIllegalPath', () => {
    it('filterIllegalPath should return right path', () => {
        expect(parseUrl.filterIllegalPath('http://www.test.com')).toBe('httpwwwtestcom');
        expect(parseUrl.filterIllegalPath('http://www.test.com/测试 23')).toBe('httpwwwtestcom测试23');
        expect(parseUrl.filterIllegalPath('http://www.test.com/测试 /测试 23')).toBe('httpwwwtestcom测试测试23');
        expect(parseUrl.filterIllegalPath('http://www.test.com/测试 /（测试 ）23')).toBe('httpwwwtestcom测试测试23');
    });
});
