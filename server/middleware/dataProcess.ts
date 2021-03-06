import * as Koa from 'koa';
import _ from 'lodash';
import mysqlService from '../service';
import { apiType } from '../shared';
import { IChapterMysql, IRequestData, ISearchMysql } from '../type';
import statusCodes from '../shared/statusCode';
import generateBook from '../utils/generateBook';
import { getLanguageData } from '../locales';

interface EmptyData {
  message: string;
}

const { NODE_ENV } = process.env;

function handleEmpty(stateType: string): EmptyData {
  const dataResult: EmptyData = {
    message: '',
  };
  if (stateType === apiType.search) {
    dataResult.message = getLanguageData('middleware.dataProcess.search.empty');
  } else if (stateType === apiType.chapter) {
    dataResult.message = getLanguageData(
      'middleware.dataProcess.chapter.empty'
    );
  }
  return dataResult;
}

function filterArray<T>(data: T[] = []): T[] {
  const record: JsObject = {};
  const result: T[] = [];
  // eslint-disable-next-line
  data.forEach((item: any) => {
    if (item.url && !record[item.url]) {
      record[item.url] = '1';
      result.push(item);
    }
  });
  return result;
}

const mysqlHandler = async (
  ctx: Koa.BaseContext,
  next: Function
  // eslint-disable-next-line
): Promise<any> => {
  const requestData: IRequestData = ctx.request.body;
  ctx.state.url = requestData.name;
  ctx.state.type = requestData.type;
  await next();
  let dataResult = ctx.state.data;
  const stateType = ctx.state.type;
  if (!stateType || NODE_ENV === 'test') {
    ctx.body = dataResult || ctx.body;
    return;
  }
  if (dataResult) {
    const searchUrl = ctx.state.url;
    if (stateType === apiType.search) {
      for (const item of dataResult) {
        await mysqlService.addItem(item, stateType);
      }
    }
    if (stateType === apiType.chapter) {
      dataResult = filterArray(dataResult);
      const searchResult: ISearchMysql = await mysqlService.searchOne(
        searchUrl,
        apiType.search
      );
      for (const item of dataResult) {
        await mysqlService.addItem(
          {
            search_id: _.get(searchResult, 'id'),
            ...item,
          },
          stateType
        );
      }
    }
    if (stateType === apiType.download) {
      dataResult = filterArray(dataResult);
      const chapterItem: IChapterMysql = await mysqlService.searchOne(
        searchUrl,
        apiType.chapter
      );
      const searchItem: ISearchMysql = await mysqlService.searchOne(
        _.get(chapterItem, 'search_id', ''),
        apiType.search,
        'id'
      );
      if (!_.isEmpty(searchItem) && !_.isEmpty(chapterItem)) {
        for (const item of dataResult) {
          await mysqlService.addItem(
            {
              chapter_id: chapterItem.id,
              ...item,
            },
            stateType
          );
        }
        const bookPath: string = await generateBook(
          dataResult,
          searchItem,
          chapterItem,
          searchUrl
        );
        dataResult = {
          message: getLanguageData('middleware.dataProcess.success'),
          code: statusCodes.OK,
          data: bookPath,
        };
      }
    }
  }

  ctx.body = _.isEmpty(dataResult) ? handleEmpty(stateType) : dataResult;
};
export default mysqlHandler;
