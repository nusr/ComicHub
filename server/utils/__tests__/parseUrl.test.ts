import {
  filterIllegalPath,
  getComicSite,
  getReferer,
  numToString,
} from '../parseUrl';

describe('getReferer', () => {
  it('getReferer should return right referer', () => {
    expect(getReferer('http://www.test.com')).toBe('http://www.test.com');
    expect(getReferer('http://www.test.com/11')).toBe('http://www.test.com');
    expect(getReferer('http://www.test.com/11/222')).toBe(
      'http://www.test.com'
    );
    expect(getReferer('https://www.test.com')).toBe('https://www.test.com');
    expect(getReferer('https://www.test.com/11/222')).toBe(
      'https://www.test.com'
    );
  });
  it('getReferer should return //', () => {
    expect(getReferer('test.com')).toBe('//');
    expect(getReferer('test.com/11')).toBe('//');
    expect(getReferer('11')).toBe('//');
    expect(getReferer('aa')).toBe('//');
    expect(getReferer('////')).toBe('//');
  });
});

describe('filterIllegalPath', () => {
  it('filterIllegalPath should return right path', () => {
    expect(filterIllegalPath('http://www.test.com')).toBe('httpwwwtestcom');
    expect(filterIllegalPath('http://www.test.com/测试 23')).toBe(
      'httpwwwtestcom测试23'
    );
    expect(filterIllegalPath('http://www.test.com/测试 /测试 23')).toBe(
      'httpwwwtestcom测试测试23'
    );
    expect(filterIllegalPath('http://www.test.com/测试 /（测试 ）23')).toBe(
      'httpwwwtestcom测试测试23'
    );
  });
});

describe('numToString', () => {
  it('numToString should return right string', () => {
    expect(numToString(0)).toBe('0000');
    expect(numToString(3)).toBe('0003');
    expect(numToString(33)).toBe('0033');
    expect(numToString(333)).toBe('0333');
    expect(numToString(3333)).toBe('3333');
    expect(numToString(33333)).toBe('33333');
    expect(numToString(333333)).toBe('333333');
  });
});

describe('getComicSite', () => {
  it('getComicSite should return right result', () => {
    expect(getComicSite('http://www.test.com')).toBe('test');
    expect(getComicSite('http://www.666.com')).toBe('666');
    expect(getComicSite('socks://www.55.net')).toBe('55');
    expect(getComicSite('33.net')).toBe('33');
  });
  it('getComicSite should return ""', () => {
    expect(getComicSite('')).toBe('');
    expect(getComicSite('com')).toBe('');
  });
});
