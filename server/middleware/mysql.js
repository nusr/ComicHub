const { typeConfig } = require('../shared/config');
const mysqlService = require('../service');
const parseUrl = require('../utils/parseUrl');
const downloadImage = require('../utils/downloadImage');
const sleep = require('../utils/wait');

function handleEmpty(stateType) {
    let dataResult = '';
    if (stateType === typeConfig.search) {
        dataResult = {
            msg: '搜索不到该漫画，请更换搜索词！',
        };
    } else if (stateType === typeConfig.chapter) {
        dataResult = {
            msg: `爬取结果为空！`,
        };
    }
    return dataResult;
}

function formatDownloadPath(dataResult, searchItem, chapterItem) {
    const dirPath = `${searchItem.title}/${chapterItem.title}`;
    return dataResult.map((item) => {
        return {
            url: item.url,
            fileName: `${dirPath}/${item.page}`,
        };
    });
}

function filterArray(data = []) {
    let record = {};
    const result = [];
    data.forEach((item) => {
        if (!record[item.url]) {
            record[item.url] = 1;
            result.push(item);
        }
    });
    return result;
}

module.exports = async (ctx, next) => {
    const queryParams = parseUrl.parseUrl(ctx.originalUrl);
    // 是否使用数据库数据
    const noCache = +queryParams.cache === 1;
    ctx.state.url = decodeURIComponent(queryParams.name);
    ctx.state.type = queryParams.type;
    if (!noCache) {
        const { type, name: realName } = queryParams;
        const name = decodeURIComponent(realName);
        if (type === typeConfig.search) {
            const result = await mysqlService.foggySearch(`%${name}%`, type);
            if (result && result.length > 0) {
                ctx.body = result;
                ctx.response.set({
                    'Mysql-Table-Search-Cache': 'true',
                });
                return;
            }
        }
        if (type === typeConfig.chapter) {
            const searchItem = await mysqlService.searchOne(
                name,
                typeConfig.search
            );
            const results = await mysqlService.searchItem(
                searchItem.id,
                type,
                (field = 'search_id')
            );
            if (results && results.length > 0) {
                ctx.body = results;
                ctx.response.set({
                    'Mysql-Table-Chapter-Cache': 'true',
                });
                return;
            }
        }
        if (type === typeConfig.download) {
            const chapterItem = await mysqlService.searchOne(
                name,
                typeConfig.chapter
            );
            const results = await mysqlService.searchItem(
                chapterItem.id,
                type,
                (field = 'chapter_id')
            );
            if (results && results.length > 0) {
                const searchItem = await mysqlService.searchOne(
                    chapterItem.search_id,
                    typeConfig.search,
                    'id'
                );

                const downloadList = formatDownloadPath(
                    results,
                    searchItem,
                    chapterItem
                );
                for (let item of downloadList) {
                    await sleep(100);
                    downloadImage(
                        item.url,
                        item.fileName,
                        parseUrl.getReferer(name)
                    );
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
        if (stateType === typeConfig.search) {
            for (let item of dataResult) {
                await mysqlService.addItem(item, stateType);
            }
        }
        if (stateType === typeConfig.chapter) {
            dataResult = filterArray(dataResult);
            const searchResult = await mysqlService.searchOne(
                searchUrl,
                typeConfig.search
            );
            if (searchResult && searchResult.id) {
                for (let item of dataResult) {
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
        if (stateType === typeConfig.download) {
            dataResult = filterArray(dataResult);
            const chapterItem = await mysqlService.searchOne(
                searchUrl,
                typeConfig.chapter
            );
            const searchItem = await mysqlService.searchOne(
                chapterItem.search_id,
                typeConfig.search,
                'id'
            );
            if (searchItem && chapterItem) {
                for (let item of dataResult) {
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
                for (let item of downloadList) {
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
