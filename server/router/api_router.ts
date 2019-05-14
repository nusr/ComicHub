import Router from 'koa-router';

import routes from './router';
const router = new Router();
router.get('/routes/:name?', (ctx) => {
  const allRoutes = Array.from(routes.stack);
  allRoutes.shift();
  const result = {};
  let counter = 0;

  allRoutes.forEach((i) => {
    const path = i.path;
    const top = path.split('/')[1];

    if (!ctx.params.name || top === ctx.params.name) {
      if (result[top]) {
        result[top].routes.push(path);
      } else {
        result[top] = { routes: [path] };
      }
      counter++;
    }
  });

  ctx.body = { counter, result };
});

export default router;
