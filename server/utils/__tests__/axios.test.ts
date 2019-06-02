import axiosTest from '../axios';
import MockAdapter from '_axios-mock-adapter@1.16.0@axios-mock-adapter';
import _ from 'lodash';

const mock = new MockAdapter(axiosTest);
import config from '../../shared/config';

describe('axios', () => {
    it('axios headers', async () => {
        mock.onGet('/test').reply(axiosConfig => {
            expect(axiosConfig.headers['User-Agent']).toBe(config.userAgent);
            expect(axiosConfig.headers['X-APP']).toBe('ComicHub');
            return [
                200,
                {
                    code: 0
                }
            ];
        });

        const response = await axiosTest.get('/test');
        expect(response.status).toBe(200);
        expect(response.data.code).toBe(0);
    });
});
