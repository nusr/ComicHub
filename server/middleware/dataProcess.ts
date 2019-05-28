import * as Koa from 'koa';
import sleep from '../utils/wait';
import downloadImage from '../utils/downloadImage';
import parseUrl from '../utils/parseUrl';
import mysqlService from '../service';
import configData from '../shared/config';
import { ISearchMysql, IChapterMysql, IRequestData } from '../type';
import _ from 'lodash';

function handleEmpty(stateType: string) {
    let dataResult: any;
    if (stateType === configData.typeConfig.search) {
        dataResult = {
            message: '搜索不到该漫画，请更换搜索词！'
        };
    } else if (stateType === configData.typeConfig.chapter) {
        dataResult = {
            message: '爬取结果为空！'
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
    return dataResult.map((item: any): any => {
        return {
            url: item.url,
            fileName: `${dirPath}/${item.page}`
        };
    });
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

/* eslint-disable */
const mysqlHandler = async (ctx: Koa.Context, next: () => Promise<any>) => {
    const requestData: IRequestData = ctx.request.body;
    const { type: requestType, name: requestName } = requestData;
    ctx.state.url = requestName;
    ctx.state.type = requestType;
    if (!requestData.noCache) {
        if (requestType === configData.typeConfig.search) {
            const result: any = await mysqlService.foggySearch(
                `%${requestName}%`,
                requestType
            );
            if (!_.isEmpty(result)) {
                ctx.body = result;
                ctx.response.set({
                    'Mysql-Search-Table-Cache': 'true'
                });
                return;
            }
        }
    }
    if (requestType === configData.typeConfig.chapter) {
        const searchItem: ISearchMysql = await mysqlService.searchOne(
            requestName,
            configData.typeConfig.search
        );
        const results: any = await mysqlService.searchItem(
            _.get(searchItem, 'id'),
            requestType,
            'search_id'
        );
        if (!_.isEmpty(results)) {
            ctx.body = results;
            ctx.response.set({
                'Mysql-Chapter-Table-Cache': 'true'
            });
            return;
        }
    }
    if (requestType === configData.typeConfig.download) {
        const chapterItem: IChapterMysql = await mysqlService.searchOne(
            requestName,
            configData.typeConfig.chapter
        );
        const results: any = await mysqlService.searchItem(
            _.get(chapterItem, 'id'),
            requestType,
            'chapter_id'
        );
        if (!_.isEmpty(results)) {
            const searchItem: ISearchMysql = await mysqlService.searchOne(
                _.get(chapterItem, 'search_id'),
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
                downloadImage(
                    item.url,
                    item.fileName,
                    parseUrl.getReferer(requestName)
                );
            }
            ctx.response.set({
                'Mysql-Table-Download-Cache': 'true'
            });
            ctx.body = {
                message: '下载成功！',
                code: 200,
                data: results
            };
            return;
        }
    }
    await next();
    let dataResult = ctx.state.data;
    const stateType = ctx.state.type;
    if (!stateType) {
        if (dataResult) {
            ctx.body = dataResult;
        }
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
            const searchResult: ISearchMysql = await mysqlService.searchOne(
                searchUrl,
                configData.typeConfig.search
            );
            for (const item of dataResult) {
                await mysqlService.addItem(
                    {
                        search_id: _.get(searchResult, 'id'),
                        ...item
                    },
                    stateType
                );
            }

        }
        if (stateType === configData.typeConfig.download) {
            // 下载失败
            dataResult = filterArray(dataResult);
            const chapterItem: IChapterMysql = await mysqlService.searchOne(
                searchUrl,
                configData.typeConfig.chapter
            );
            const searchItem: ISearchMysql = await mysqlService.searchOne(
                _.get(chapterItem, 'search_id'),
                configData.typeConfig.search,
                'id'
            );
            if (!_.isEmpty(searchItem) && !_.isEmpty(chapterItem)) {
                for (const item of dataResult) {
                    await mysqlService.addItem(
                        {
                            chapter_id: chapterItem.id,
                            ...item
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
            dataResult = {
                message: '下载成功！',
                code: 200,
                data: dataResult
            };
        }
    } else {
        dataResult = handleEmpty(stateType);
    }

    ctx.body = dataResult;
};
export default mysqlHandler;
