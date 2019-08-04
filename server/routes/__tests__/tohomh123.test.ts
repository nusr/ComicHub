import superTest from 'supertest';
import koaServer from '../../index';
import { ISearchItem } from '../../type';

const { server } = koaServer;
const request = superTest(server);
afterAll(() => {
  server.close();
});

describe('test', () => {
  it('test /tohomh123 search', async () => {
    const name = '火影';
    const response: superTest.Response = await request.post('/tohomh123').send({ type: 'search', name });
    const data: ISearchItem[] = response.body;
    expect(data.every((item: ISearchItem) => item.title.includes(name))).toBeTruthy();
  });
  it('test /tohomh123 chapter', async () => {
    const response: superTest.Response = await request.post('/tohomh123').send({
      type: 'chapter',
      name: 'https://www.tohomh123.com/huoyingrenzhejiezhishu/',
    });
    expect(response.text).toBe(JSON.stringify([
      {
        'url': 'https://www.tohomh123.com/huoyingrenzhejiezhishu/6.html',
        'title': '6篇',
        'page_size': 17,
      },
      {
        'url': 'https://www.tohomh123.com/huoyingrenzhejiezhishu/5.html',
        'title': '5篇',
        'page_size': 23,
      },
      {
        'url': 'https://www.tohomh123.com/huoyingrenzhejiezhishu/4.html',
        'title': '4篇',
        'page_size': 32,
      },
      {
        'url': 'https://www.tohomh123.com/huoyingrenzhejiezhishu/3.html',
        'title': '3篇',
        'page_size': 10,
      },
      {
        'url': 'https://www.tohomh123.com/huoyingrenzhejiezhishu/2.html',
        'title': '2篇',
        'page_size': 10,
      },
      {
        'url': 'https://www.tohomh123.com/huoyingrenzhejiezhishu/1.html',
        'title': '1篇',
        'page_size': 6,
      },
    ]));
  });
});
