const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const config = require('../shared/config');
const pidusage = require('pidusage');
const mustache = require('mustache');
router.get('/', async (ctx) => {
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

    const stats = await pidusage(process.pid);

    ctx.set({
        'Cache-Control': 'no-cache',
    });
    const filePath = path.resolve(__dirname, '../views/welcome.html');
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
                    ((ctx.debug.request / (stats.elapsed / 1000)) * 60).toFixed(
                        3
                    ) + ' 次/分钟',
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
router.get('/test/:id', require('../routes/test'));
// 左侧菜单
router.get('/menu', require('../routes/menu'));
// 看漫画
router.get('/manhuagui', require('../routes/manhuagui'));
router.get('/tohomh123', require('../routes/tohomh123'));
module.exports = router;
