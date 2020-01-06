import * as Koa from 'koa';
import util from './utils';
import axios from '../../utils/axios';
import { apiType } from '../../shared';
import { IRequestData } from '../../type';
import { getAsyncHTML } from '../../utils/puppeteer';

let temp: object;
const qq = async (ctx: Koa.BaseContext) => {
  const { type, name }: IRequestData = ctx.request.body;
  if (apiType.search === type) {
    const response = await axios.get(util.getSearchUrl(name));
    temp = util.getSearchList(response.data);
  }
  if (apiType.chapter === type) {
    const response = await axios.get(name);
    temp = util.getChapterList(response.data);
  }
  if (apiType.download === type) {
    // TODO 没有爬取到一话的所有漫画图片
    const html = await getAsyncHTML(name, { isScroll: true });
    temp = util.getDownloadList(html);
  }
  ctx.state.data = temp;
};
export default qq;
