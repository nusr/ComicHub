import Router from 'koa-router';
import path from 'path';
import * as Koa from 'koa';
import fs from 'fs';
import mustache from 'mustache';
import sourceUsed from 'pidusage';
import logger from '../utils/logger';
import config from '../shared';
// Router
import testRouter from '../routes/test';
import menuRouter from '../routes/menu';
import tohomh from '../routes/tohomh123';
import manhuagui from '../routes/manhuagui';
import u17 from '../routes/u17';

const router = new Router();
router.get('/', async (ctx: Koa.Context) => {
    ctx.set({
        'Content-Type': 'text/html; charset=UTF-8',
    });

    let showDebug;
    if (!config.debugInfo || config.debugInfo === 'false') {
        showDebug = false;
    } else {
        showDebug = config.debugInfo === true || config.debugInfo === ctx.query.debug;
    }

    const stats = await sourceUsed(process.pid);

    ctx.set({
        'Cache-Control': 'no-cache',
    });
    const filePath = path.join(process.cwd(), './views/welcome.html');
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
                    `${(ctx.debug.request / (stats.elapsed / 1000) * 60).toFixed(3)} 次/分钟`,
            },
            {
                name: '内存占用',
                value: `${stats.memory / 1000000} MB`,
            },
            {
                name: 'CPU 占用',
                value: `${stats.cpu}%`,
            },
            {
                name: '运行时间',
                value: `${(stats.elapsed / 3600000).toFixed(2)} 小时`,
            },
        ],
    };
    const template = fs.readFileSync(filePath, 'utf8');
    ctx.body = mustache.render(template, viewData);
});

// Test
router.get('/test/:id', testRouter);
// 左侧菜单
router.get('/menu', menuRouter);
// 看漫画
router.post('/manhuagui', manhuagui);
router.post('/tohomh123', tohomh);
router.post('/u17', u17);
export default router;
