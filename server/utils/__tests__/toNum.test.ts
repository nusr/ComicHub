import toNum from '../toNum';

describe('toNum', () => {
  it('toNum should return right result', async () => {
    expect(toNum('33.33')).toBe(33);
    expect(toNum('33')).toBe(33);
    expect(toNum('33ff')).toBe(33);
    expect(toNum(undefined)).toBe(0);
    expect(toNum('fefe')).toBe(0);
  });
});
