import axiosTest from './axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axiosTest);
import config from '../shared/config';

describe('axios', () => {
    it('axios headers', async () => {
        mock.onGet('/test').reply(axiosConfig => {
            expect(axiosConfig.headers['User-Agent']).toBe(config.userAgent);
            expect(axiosConfig.headers['X-APP']).toBe('ComicHub');
            return [
                200,
                {
                    code: 0,
                },
            ];
        });

        const response = await axiosTest.get('/test');
        expect(response.status).toBe(200);
        expect(response.data.code).toBe(0);
    });

    it('axios retry', async () => {
        const requestRun = jest.fn();
        let requestTime: any;

        mock.onGet('/test').reply(() => {
            requestRun();

            // retryDelay
            const now: any = new Date();
            if (requestTime) {
                expect(now - requestTime).toBeGreaterThanOrEqual(100);
                expect(now - requestTime).toBeLessThan(120);
            }
            requestTime = new Date();

            return [
                404,
                {
                    code: 1,
                },
            ];
        });

        try {
            await axiosTest.get('/test');
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.code).toBe(1);
        }

        // retries
        expect(requestRun).toHaveBeenCalledTimes(config.requestRetry + 1);
    });
});
