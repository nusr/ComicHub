// @ts-ignore
import superTest from 'supertest';
import koaServer from '../../index';

const { server } = koaServer;
const request = superTest(server);

afterAll(() => {
    server.close();
});

describe('header', () => {
    it('header', async () => {
        const response: any = await request.get('/test/1');
        // Test generate random port
        expect(response.headers['access-control-allow-origin']).toContain('127.0.0.1:');
        expect(response.headers['access-control-allow-methods']).toBe('GET,HEAD,PUT,POST,DELETE,PATCH');
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
});
