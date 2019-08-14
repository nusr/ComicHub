import { getLanguageData } from '../index';

describe('getLanguageData', () => {
  it('getLanguageData should return right result', () => {
    expect(getLanguageData('middleware.accessControl.deny')).toBe(
      '没有访问权限！',
    );
  });
});
