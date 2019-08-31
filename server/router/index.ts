import Router from 'koa-router';
import * as Koa from 'koa';
// Router
import testRouter from '../routes/test';
import sql from '../routes/sql';
import menuRouter from '../routes/menu';
import tohomh from '../routes/tohomh123';
import manhuagui from '../routes/manhuagui';
import u17 from '../routes/u17';
import qq from '../routes/qq';
import kuaikanmanhua from '../routes/kuaikanmanhua';

const router = new Router();
router.get('/', (ctx: Koa.Context) => {
  ctx.set({
    'Cache-Control': 'no-cache',
  });
  ctx.body = {
    request: 'Welcome Use Comic Hub',
  };
});

// Test
router.get('/test/:id', testRouter);
// 查询 sql 数据
router.post('/sql', sql);
// 左侧菜单
router.get('/menu', menuRouter);
router.post('/manhuagui', manhuagui);
router.post('/tohomh123', tohomh);
router.post('/u17', u17);
router.post('/qq', qq);
router.post('/kuaikanmanhua', kuaikanmanhua);

export default router;
