import superTest from 'supertest';
import koaServer from '../../index';

const { server } = koaServer;
const request = superTest(server);

afterAll(() => {
  server.close();
});

describe('error', () => {
  it('error', async () => {
    const response: superTest.Response = await request.get('/test/0');
    expect(response.text).toMatch(
      eval(
        `/ComicHub 发生了一些意外: <pre>Error: Error test/`
      )
    );
  });
});
