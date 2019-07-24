import { getLanguageData } from '../index';

describe('getLanguageData', () => {
  it('getLanguageData should return right result', () => {
    expect(getLanguageData('middleware.accessControl.deny', 'zh-CN')).toBe(
      '没有访问权限！'
    );
    expect(getLanguageData('middleware.accessControl.deny', 'en-US')).toBe(
      'Access denied！'
    );
  });
});
