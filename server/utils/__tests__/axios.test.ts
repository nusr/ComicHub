import MockAdapter from 'axios-mock-adapter';
import axiosTest from '../axios';
import config from '../../shared';
import statusCodes from '../../middleware/config';

const mock = new MockAdapter(axiosTest);
const SUCCESS_CODE: number = 0;
describe('axios', () => {
    it('axios headers', async () => {
        mock.onGet('/test').reply((axiosConfig) => {
            expect(axiosConfig.headers['User-Agent']).toBe(config.userAgent);
            expect(axiosConfig.headers['X-APP']).toBe('ComicHub');
            return [
                statusCodes.OK,
                {
                    code: SUCCESS_CODE,
                },
            ];
        });

        const response = await axiosTest.get('/test');
        expect(response.status).toBe(statusCodes.OK);
        expect(response.data.code).toBe(SUCCESS_CODE);
    });
});
