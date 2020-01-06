import * as Koa from 'koa';
import util from './utils';
import axios from '../../utils/axios';
import { apiType } from '../../shared';
import { IRequestData } from '../../type';
import { getAsyncHTML } from '../../utils/puppeteer';
let temp: object;
const kuaikan = async (ctx: Koa.BaseContext) => {
  const { type, name }: IRequestData = ctx.request.body;
  if (apiType.search === type) {
    const url: string = util.getSearchUrl(name);
    const response = await axios.get(url);
    temp = util.getSearchList(response.data);
  }
  if (apiType.chapter === type) {
    const response = await axios.get(name);
    temp = util.getChapterList(response.data);
  }
  if (apiType.download === type) {
    const html = await getAsyncHTML(name,{});
    temp = util.getDownloadList(html);
  }
  ctx.state.data = temp;
};
export default kuaikan;
