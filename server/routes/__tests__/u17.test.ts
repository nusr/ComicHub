import superTest from 'supertest';
import koaServer from '../../index';
import { ISearchItem } from '../../type';

const { server } = koaServer;
const request = superTest(server);
afterAll(() => {
  server.close();
});

describe('test', () => {
  it('test /u17 search', async () => {
    const name = '火影';
    const response: superTest.Response = await request.post('/u17').send({ type: 'search', name });
    const data: ISearchItem[] = response.body;
    expect(data.every((item: ISearchItem) => item.title.includes(name))).toBeTruthy();
  });

  it('test /u17 chapter', async () => {
    const response: superTest.Response = await request.post('/u17').send({
      'type': 'chapter',
      'name': 'http://www.u17.com/comic/8347.html',
    });
    expect(response.body.length).toBeGreaterThanOrEqual(6)
  });
});
