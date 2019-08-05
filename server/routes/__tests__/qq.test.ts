import superTest from 'supertest';
import koaServer from '../../index';
import { ISearchItem } from '../../type';

const { server } = koaServer;
const request = superTest(server);
afterAll(() => {
  server.close();
});

describe('test', () => {
  it('test /qq search', async () => {
    const name = '火影';
    const response: superTest.Response = await request.post('/qq').send({ type: 'search', name });
    const data: ISearchItem[] = response.body;
    expect(data.some((item: ISearchItem) => item.title.includes(name))).toBeTruthy();
  });
  it('test /qq chapter', async () => {
    const response: superTest.Response = await request.post('/qq').send({
      'type': 'chapter',
      'name': 'https://ac.qq.com/Comic/comicInfo/id/541201',
    });
    expect(response.body.length).toBeGreaterThanOrEqual(5)
  });
});
