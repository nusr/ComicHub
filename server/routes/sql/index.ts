/* eslint-disable */
import * as Koa from 'koa';
import { apiType } from '../../shared';
import mysqlService from '../../service';
import _ from 'lodash';
import { IChapterMysql, IRequestData, ISearchMysql } from '../../type';
import generateBook from '../../utils/generateBook';
import { getLanguageData } from '../../locales';
import statusCodes from '../../shared/statusCode';
let temp: any;
const sqlCache = async (ctx: Koa.BaseContext) => {
  const {
    name: requestName,
    type: requestType,
  }: IRequestData = ctx.request.body;
  if (requestType === apiType.search) {
    const result: any = await mysqlService.foggySearch(
      `%${requestName}%`,
      requestType
    );
    if (!_.isEmpty(result)) {
      ctx.response.set({
        'Mysql-Search-Table-Cache': 'true',
      });
      temp = result;
    }
  }
  if (requestType === apiType.chapter) {
    const searchItem: ISearchMysql = await mysqlService.searchOne<ISearchMysql>(
      requestName,
      apiType.search
    );
    const results: any = await mysqlService.searchItem(
      _.get(searchItem, 'id', ''),
      requestType,
      'search_id'
    );
    if (!_.isEmpty(results)) {
      temp = results;
      ctx.response.set({
        'Mysql-Chapter-Table-Cache': 'true',
      });
    }
  }
  if (requestType === apiType.download) {
    const chapterItem: IChapterMysql = await mysqlService.searchOne(
      requestName,
      apiType.chapter
    );
    const results: any = await mysqlService.searchItem(
      _.get(chapterItem, 'id', ''),
      requestType,
      'chapter_id'
    );
    if (!_.isEmpty(results)) {
      const searchItem: ISearchMysql = await mysqlService.searchOne(
        _.get(chapterItem, 'search_id', ''),
        apiType.search,
        'id'
      );
      const bookPath: string = await generateBook(
        results,
        searchItem,
        chapterItem,
        requestName
      );

      ctx.response.set({
        'Mysql-Download-Table-Cache': 'true',
      });
      temp = {
        message: getLanguageData('middleware.dataProcess.success'),
        code: statusCodes.OK,
        data: bookPath,
      };
    }
  }
  ctx.state.data = temp;
};
export default sqlCache;
