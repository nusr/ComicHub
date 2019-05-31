import { getReferer, filterIllegalPath, numToString } from './parseUrl';

describe('getReferer', () => {
    it('getReferer should return right referer', () => {
        expect(getReferer('http://www.test.com')).toBe('http://www.test.com');
        expect(getReferer('http://www.test.com/11')).toBe('http://www.test.com');
        expect(getReferer('http://www.test.com/11/222')).toBe('http://www.test.com');
        expect(getReferer('https://www.test.com')).toBe('https://www.test.com');
        expect(getReferer('https://www.test.com/11/222')).toBe('https://www.test.com');
    });
    it('getReferer should return //', () => {
        expect(getReferer('test.com')).toBe('//');
        expect(getReferer('www.test.com/11')).toBe('//');
        expect(getReferer('11')).toBe('//');
        expect(getReferer('aa')).toBe('//');
        expect(getReferer('////')).toBe('//');
    });
});

describe('filterIllegalPath', () => {
    it('filterIllegalPath should return right path', () => {
        expect(filterIllegalPath('http://www.test.com')).toBe('httpwwwtestcom');
        expect(filterIllegalPath('http://www.test.com/测试 23')).toBe('httpwwwtestcom测试23');
        expect(filterIllegalPath('http://www.test.com/测试 /测试 23')).toBe('httpwwwtestcom测试测试23');
        expect(filterIllegalPath('http://www.test.com/测试 /（测试 ）23')).toBe('httpwwwtestcom测试测试23');
    });
});


describe('numToString', () => {
    it('numToString should return right string', () => {
        expect(numToString(3)).toBe('00003');
        expect(numToString(33)).toBe('00033');
        expect(numToString(333)).toBe('00333');
        expect(numToString(3333)).toBe('03333');
        expect(numToString(33333)).toBe('33333');
        expect(numToString(333333)).toBe('333333');
    });
});
