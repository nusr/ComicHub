import MockAdapter from 'axios-mock-adapter';
import axiosTest from '../axios';
import config from '../../shared/config';

const mock = new MockAdapter(axiosTest);

describe('axios', () => {
    it('axios headers', async () => {
        mock.onGet('/test').reply((axiosConfig) => {
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
});
