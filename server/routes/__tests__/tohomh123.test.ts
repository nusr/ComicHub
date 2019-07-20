import superTest from 'supertest';
import koaServer from '../../index';

const { server } = koaServer;
const request = superTest(server);
afterAll(() => {
    server.close();
});

describe('test', () => {
    it('test /tohomh123', async () => {
        const response: superTest.Response = await request.post('/tohomh123');
        expect(response.text).toBe(JSON.stringify({
            message: '参数错误！',
        }));
    });
});
