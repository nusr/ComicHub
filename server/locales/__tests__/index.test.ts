import { getLanguageData } from '../index';
import zhCN from '../zh-CN';
import enUS from '../en-US';

describe('getLanguageData', () => {
    it('getLanguageData should return right result', () => {
        expect(getLanguageData('middleware.accessControl.deny', 'zh-CN')).toBe(zhCN['middleware.accessControl.deny']);
        expect(getLanguageData('middleware.accessControl.deny', 'en-US')).toBe(enUS['middleware.accessControl.deny']);
    });
});
