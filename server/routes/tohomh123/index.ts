import * as Koa from 'koa';
import util from './utils';
import axios from '../../utils/axios';
import { apiType } from '../../shared';
import { IRequestData } from '../../type';
let temp: object;
const tuHao = async (ctx: Koa.BaseContext) => {
  const { type, name, page_size: pageSize }: IRequestData = ctx.request.body;

  if (apiType.search === type) {
    const response = await axios.get(util.getSearchUrl(name));
    temp = util.getSearchList(response.data);
  }
  if (apiType.chapter === type) {
    const response = await axios.get(name);
    temp = util.getChapterList(response.data);
  }
  if (apiType.download === type) {
    // TODO 下载出现问题
    const response = await axios.get(name);
    temp = util.getDownloadItem(response.data, pageSize);
  }
  ctx.state.data = temp;
};
export default tuHao;
