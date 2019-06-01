import wait from '../wait';

describe('wait', () => {
    it('wait 0.1 second', async () => {
        const startDate: any = new Date();

        await wait(0.1 * 1000);

        const endDate: any = new Date();
        expect(endDate - startDate).toBeGreaterThan(90);
        expect(endDate - startDate).toBeLessThan(110);
    });
});
