import util from './utils';
import axios from '../../utils/axios';
import configData from '../../shared/config';
import * as Koa from 'koa';
import { IRequestData } from '../../type';

export default async function tuHao(ctx: Koa.BaseContext) {
  const { type, name, page_size }: IRequestData = ctx.request.body;
  let temp: any;
  if (configData.typeConfig.search === type) {
    const response = await axios.get(util.getSearchUrl(name));
    temp = util.getSearchList(response.data);
  }
  if (configData.typeConfig.chapter === type) {
    const response = await axios.get(name);
    temp = util.getChapterList(response.data);
  }
  if (configData.typeConfig.download === type) {
    const response = await axios.get(name);
    temp = util.getDownloadItem(response.data, page_size);
  }
  ctx.state.data = temp;
}
