import * as Koa from 'koa';
import _ from 'lodash';
import mysqlService from '../service';
import { apiType } from '../shared';
import { IChapterMysql, IRequestData, ISearchMysql } from '../type';
import statusCodes from '../shared/statusCode';
import generateBook from '../utils/generateBook';
import { getLanguageData } from '../locales';

type EmptyData = {
  message: string;
};

const { NODE_ENV } = process.env;
const REQUEST_WHITE_LIST: string[] = ['/menu', '/test', '/sql'];

function handleEmpty(stateType: string): EmptyData {
  const dataResult: EmptyData = {
    message: '',
  };
  if (stateType === apiType.search) {
    dataResult.message = getLanguageData('middleware.dataProcess.search.empty');
  } else if (stateType === apiType.chapter) {
    dataResult.message = getLanguageData(
      'middleware.dataProcess.chapter.empty',
    );
  }
  return dataResult;
}

function filterArray<T>(data: T[] = []): T[] {
  const record: JsObject = {};
  const result: T[] = [];
  data.forEach((item: any) => {
    if (item.url && !record[item.url]) {
      record[item.url] = '1';
      result.push(item);
    }
  });
  return result;
}

const mysqlHandler = async (ctx: Koa.Context, next: Function): Promise<any> => {
  const requestData: IRequestData = ctx.request.body;
  const { type: requestType = '', name: requestName = '' } = requestData;
  const checkRequestUrl: boolean =
    !REQUEST_WHITE_LIST.some((item: string): boolean =>
      ctx.url.startsWith(item),
    ) &&
    (!requestName || !requestType);
  if (checkRequestUrl) {
    ctx.body = {
      message: getLanguageData('middleware.dataProcess.paramsFail'),
    };
    return;
  }
  ctx.state.url = requestName;
  ctx.state.type = requestType;

  await next();
  let dataResult = ctx.state.data;
  const stateType = ctx.state.type;
  if (!stateType) {
    if (dataResult) {
      ctx.body = dataResult;
    }
    return;
  }
  if (dataResult && NODE_ENV !== 'test') {
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
        apiType.search,
      );
      for (const item of dataResult) {
        await mysqlService.addItem(
          {
            search_id: _.get(searchResult, 'id'),
            ...item,
          },
          stateType,
        );
      }
    }
    if (stateType === apiType.download) {
      dataResult = filterArray(dataResult);
      const chapterItem: IChapterMysql = await mysqlService.searchOne(
        searchUrl,
        apiType.chapter,
      );
      const searchItem: ISearchMysql = await mysqlService.searchOne(
        _.get(chapterItem, 'search_id', ''),
        apiType.search,
        'id',
      );
      if (!_.isEmpty(searchItem) && !_.isEmpty(chapterItem)) {
        for (const item of dataResult) {
          await mysqlService.addItem(
            {
              chapter_id: chapterItem.id,
              ...item,
            },
            stateType,
          );
        }
        const bookPath: string = await generateBook(
          dataResult,
          searchItem,
          chapterItem,
          searchUrl,
        );
        dataResult = {
          message: getLanguageData('middleware.dataProcess.success'),
          code: statusCodes.OK,
          data: bookPath,
        };
      }
    }
  } else {
    dataResult = handleEmpty(stateType);
  }

  ctx.body = dataResult;
};
export default mysqlHandler;
