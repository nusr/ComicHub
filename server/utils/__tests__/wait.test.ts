import wait from '../wait';

describe('wait', (): void => {
  it('wait 0.1 second', async () => {
    const startDate: number = new Date().getTime();

    await wait(100);

    const endDate: number = new Date().getTime();
    expect(endDate - startDate).toBeGreaterThan(80);
    expect(endDate - startDate).toBeLessThan(120);
  });
});
