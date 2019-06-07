import supertest from 'supertest';
import koaServer from '../../index';

const { server } = koaServer;
const request = supertest(server);

afterAll(() => {
    server.close();
});

describe('error', () => {
    it('error', async () => {
        // @ts-ignore
        process.env.PORT = 3000 + Math.floor(Math.random() * 1000);
        const response: any = await request.get('/test/0');
        expect(response.text).toMatch(/Comic 发生了一些意外: <pre>Error: Error test/);
    });
});
