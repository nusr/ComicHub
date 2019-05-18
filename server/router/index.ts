import Router from 'koa-router';
import path from 'path';
import fs from 'fs';
import mustache from 'mustache';
import sourceUsed from 'pidusage';
import logger from '../utils/logger';
import config from '../shared/config';
// router
import testRouter from '../routes/test';
import menuRouter from '../routes/menu';
import tohomh from '../routes/tohomh123';
import manhuagui from '../routes/manhuagui';

const index = new Router();
index.get('/', async ctx => {
    ctx.set({
        'Content-Type': 'text/html; charset=UTF-8',
    });

    let showDebug;
    if (!config.debugInfo || config.debugInfo === 'false') {
        showDebug = false;
    } else {
        showDebug =
      config.debugInfo === true || config.debugInfo === ctx.query.debug;
    }

    const stats = await sourceUsed(process.pid);

    ctx.set({
        'Cache-Control': 'no-cache',
    });
    const filePath = path.resolve(__dirname, '../../views/welcome.html');
    logger.info(filePath);
    const viewData = {
        showDebug,
        debug: [
            {
                name: '请求数',
                value: ctx.debug.request,
            },
            {
                name: '请求频率',
                value:
          ((ctx.debug.request / (stats.elapsed / 1000)) * 60).toFixed(3) +
          ' 次/分钟',
            },
            {
                name: '内存占用',
                value: stats.memory / 1000000 + ' MB',
            },
            {
                name: 'CPU 占用',
                value: stats.cpu + '%',
            },
            {
                name: '运行时间',
                value: (stats.elapsed / 3600000).toFixed(2) + ' 小时',
            },
        ],
    };
    const template = fs.readFileSync(filePath, 'utf8');
    ctx.body = mustache.render(template, viewData);
});

// test
index.get('/test/:id', testRouter);
// 左侧菜单
index.get('/menu', menuRouter);
// 看漫画
index.post('/manhuagui', manhuagui);
index.post('/tohomh123', tohomh);
export default index;
