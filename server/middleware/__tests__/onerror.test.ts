import superTest from 'supertest';
import koaServer from '../../index';
import { getLanguageData } from '../../locales';

const { server } = koaServer;
const request = superTest(server);

afterAll(() => {
    server.close();
});

describe('error', () => {
    it('error', async () => {
        const response: any = await request.get('/test/0');
        // eslint-disable-next-line
        expect(response.text).toMatch(eval(`/${getLanguageData('middleware.onerror.error')}: <pre>Error: Error test/`));
    });
});
