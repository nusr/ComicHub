import superTest from 'supertest';
import koaServer from '../../index';
import { ISearchItem } from '../../type';

const { server } = koaServer;
const request = superTest(server);
afterAll(() => {
  server.close();
});

describe('test', () => {
  it('test /kuaikanmanhua search', async () => {
    const name = '火影';
    const response: superTest.Response = await request.post('/kuaikanmanhua').send({ type: 'search', name });
    const data: ISearchItem[] = response.body;
    expect(data.every((item: ISearchItem) => item.title.includes(name))).toBeTruthy();
  });
  it('test /kuaikanmanhua chapter', async () => {
    const response: superTest.Response = await request.post('/kuaikanmanhua').send({
      'type': 'chapter',
      'name': 'https://www.kuaikanmanhua.com/web/topic/1342',
    });
    expect(response.body.length).toBeGreaterThan(700);
  },100000);
});
