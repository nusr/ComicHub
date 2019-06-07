import 'jest';
import { getCurrentStep } from '../HomePage';
import { typeConfig } from '../config';

describe('getCurrentStep', () => {
    it('getCurrentStep Should Right Result', () => {
        expect(getCurrentStep(typeConfig.search)).toBe(0);
        expect(getCurrentStep(typeConfig.chapter)).toBe(1);
        expect(getCurrentStep(typeConfig.download)).toBe(2);
        expect(getCurrentStep(typeConfig.result)).toBe(3);
    });
    it('getCurrentStep Should Handle Non String', () => {
        expect(getCurrentStep()).toBe(0);
        expect(getCurrentStep('test')).toBe(0);
        expect(getCurrentStep('测试')).toBe(0);
    });
});
