import superTest from 'supertest';
import koaServer from '../../index';
import urlConfig from '../../shared/urlConfig';

const { server } = koaServer;
const request = superTest(server);

afterAll(() => {
  server.close();
});

describe('Test /menu Api', () => {
  it('/menu should result right result', async () => {
    const response: superTest.Response = await request.get('/menu');
    expect(response.text).toBe(JSON.stringify(urlConfig));
  });
});
