import superTest from 'supertest';
import koaServer from '../../index';
import { ISearchItem } from '../../type';

const { server } = koaServer;
const request = superTest(server);
afterAll(() => {
  server.close();
});

describe('test', () => {
  it('test /manhuagui search', async () => {
    const name = '火影';
    const response: superTest.Response = await request.post('/manhuagui').send({ type: 'search', name });
    const data: ISearchItem[] = response.body;
    expect(data.every((item: ISearchItem) => item.title.includes(name))).toBeTruthy();
  });

  it('test /manhuagui chapter', async () => {
    const response: superTest.Response = await request.post('/manhuagui').send({
      'type': 'chapter',
      'name': 'https://www.manhuagui.com/comic/19187/',
    });
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

});
