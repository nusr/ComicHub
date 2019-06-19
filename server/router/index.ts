import Router from 'koa-router';
import * as Koa from 'koa';
// Router
import testRouter from '../routes/test';
import menuRouter from '../routes/menu';
import tohomh from '../routes/tohomh123';
import manhuagui from '../routes/manhuagui';
import u17 from '../routes/u17';

const router = new Router();
router.get('/', async (ctx: Koa.Context) => {
    ctx.set({
        'Cache-Control': 'no-cache',
    });

    ctx.body = {
        request: ctx.debug.request,
    };
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
