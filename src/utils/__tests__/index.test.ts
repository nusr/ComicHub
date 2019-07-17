import { renderDate, addZero } from '../index';

describe('addZero', () => {
    it('addZero should return right result', () => {
        expect(addZero(0)).toBe('00');
        expect(addZero(9)).toBe('09');
        expect(addZero(10)).toBe('10');
        expect(addZero(1000)).toBe('1000');
    });
});

describe('renderDate', () => {
    it('renderDate should return right result', () => {
        expect(renderDate('2019-7-10')).toBe('2019-07-10 00:00:00');
        expect(renderDate(1562688000000)).toBe('2019-07-10 00:00:00');
    });
    it('renderDate should handle error input', () => {
        expect(renderDate('veve')).toBe('');
        expect(renderDate('444444')).toBe('');
        expect(renderDate(99915626880000000)).toBe('');
    });
});
