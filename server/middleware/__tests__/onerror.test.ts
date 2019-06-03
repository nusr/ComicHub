import supertest from 'supertest';
import koaServer from '../../index';

const { server } = koaServer;
const request = supertest(server);

afterAll(() => {
    server.close();
});

describe('error', () => {
    it(`error`, async () => {
        const response = await request.get('/test/0');
        expect(response.text).toMatch(/Comic 发生了一些意外: <pre>Error: Error test/);
    });
});
