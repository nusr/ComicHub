import * as Koa from 'koa';
import sleep from '../utils/wait';
import downloadImage from '../utils/downloadImage';
import parseUrl from '../utils/parseUrl';
import mysqlService from '../service';
import configData from '../shared/config';
import { ISearchMysql, IChapterMysql } from '../service/type';

function handleEmpty(stateType: string) {
  let dataResult: any;
  if (stateType === configData.typeConfig.search) {
    dataResult = {
      msg: '搜索不到该漫画，请更换搜索词！',
    };
  } else if (stateType === configData.typeConfig.chapter) {
    dataResult = {
      msg: '爬取结果为空！',
    };
  }
  return dataResult;
}

function formatDownloadPath(
  dataResult: any,
  searchItem: ISearchMysql,
  chapterItem: IChapterMysql
) {
  const dirPath = `${searchItem.title}/${chapterItem.title}`;
  return dataResult.map(
    (item: any): any => {
      return {
        url: item.url,
        fileName: `${dirPath}/${item.page}`,
      };
    }
  );
}

function filterArray(data: any = []) {
  const record: any = {};
  const result: any = [];
  data.forEach((item: any) => {
    if (!record[item.url]) {
      record[item.url] = 1;
      result.push(item);
    }
  });
  return result;
}

const mysqlHandler = async (ctx: any, next: () => Promise<any>) => {
  const queryParams = parseUrl.parseUrl(ctx.originalUrl);
  // 是否使用数据库数据
  const noCache = +queryParams.cache === 1;
  ctx.state.url = decodeURIComponent(queryParams.name);
  ctx.state.type = queryParams.type;
  if (!noCache) {
    const { type, name: realName } = queryParams;
    const name = decodeURIComponent(realName);
    if (type === configData.typeConfig.search) {
      const result: any = await mysqlService.foggySearch(`%${name}%`, type);
      if (result && result.length > 0) {
        ctx.body = result;
        ctx.response.set({
          'Mysql-Table-Search-Cache': 'true',
        });
        return;
      }
    }
    if (type === configData.typeConfig.chapter) {
      const searchItem: any = await mysqlService.searchOne(
        name,
        configData.typeConfig.search
      );
      const results: any = await mysqlService.searchItem(
        searchItem.id,
        type,
        'search_id'
      );
      if (results && results.length > 0) {
        ctx.body = results;
        ctx.response.set({
          'Mysql-Table-Chapter-Cache': 'true',
        });
        return;
      }
    }
    if (type === configData.typeConfig.download) {
      const chapterItem: any = await mysqlService.searchOne(
        name,
        configData.typeConfig.chapter
      );
      const results: any = await mysqlService.searchItem(
        chapterItem.id,
        type,
        'chapter_id'
      );
      if (results && results.length > 0) {
        const searchItem: any = await mysqlService.searchOne(
          chapterItem.search_id,
          configData.typeConfig.search,
          'id'
        );

        const downloadList = formatDownloadPath(
          results,
          searchItem,
          chapterItem
        );
        for (const item of downloadList) {
          await sleep(100);
          downloadImage(item.url, item.fileName, parseUrl.getReferer(name));
        }
        ctx.response.set({
          'Mysql-Table-Download-Cache': 'true',
        });
        ctx.body = results;
        return;
      }
    }
  }

  await next();
  let dataResult = ctx.state.data;
  const stateType = ctx.state.type;
  if (!stateType) {
    return;
  }
  if (dataResult) {
    const searchUrl = ctx.state.url;
    if (stateType === configData.typeConfig.search) {
      for (const item of dataResult) {
        await mysqlService.addItem(item, stateType);
      }
    }
    if (stateType === configData.typeConfig.chapter) {
      dataResult = filterArray(dataResult);
      const searchResult: any = await mysqlService.searchOne(
        searchUrl,
        configData.typeConfig.search
      );
      if (searchResult && searchResult.id) {
        for (const item of dataResult) {
          await mysqlService.addItem(
            {
              search_id: searchResult.id,
              ...item,
            },
            stateType
          );
        }
      }
    }
    if (stateType === configData.typeConfig.download) {
      dataResult = filterArray(dataResult);
      const chapterItem: any = await mysqlService.searchOne(
        searchUrl,
        configData.typeConfig.chapter
      );
      const searchItem: any = await mysqlService.searchOne(
        chapterItem.search_id,
        configData.typeConfig.search,
        'id'
      );
      if (searchItem && chapterItem) {
        for (const item of dataResult) {
          await mysqlService.addItem(
            {
              chapter_id: chapterItem.id,
              ...item,
            },
            stateType
          );
        }
        const downloadList = formatDownloadPath(
          dataResult,
          searchItem,
          chapterItem
        );
        for (const item of downloadList) {
          await sleep(100);
          downloadImage(
            item.url,
            item.fileName,
            parseUrl.getReferer(searchUrl)
          );
        }
      }
    }
  } else {
    dataResult = handleEmpty(stateType);
  }

  ctx.body = dataResult;
};
export default mysqlHandler;
