import Router from 'koa-router';
import * as Koa from 'koa';
import routes from './index';

const router = new Router();

router.get('/routes/:name?', (ctx: Koa.Context) => {
    const allRoutes = Array.from(routes.stack);
    allRoutes.shift();
    const result: any = {};
    let counter = 0;

    allRoutes.forEach((i) => {
        const { path } = i;
        const top = path.split('/')[1];

        if (!ctx.params.name || top === ctx.params.name) {
            if (result[top]) {
                result[top].routes.push(path);
            } else {
                result[top] = { routes: [path] };
            }
            counter += 1;
        }
    });

    ctx.body = {
        counter,
        result,
    };
});

export default router;
