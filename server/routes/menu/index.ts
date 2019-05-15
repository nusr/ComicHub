import urlConfig from '../../shared/urlConfig';
import * as Koa from 'koa';
const Menu = async (ctx: Koa.Context) => {
  ctx.state.type = 'menu';
  ctx.state.data = Object.keys(urlConfig).map((key: string) => {
    const item: any = urlConfig[key];
    return {
      ...item,
      flag: key,
    };
  });
};
export default Menu;
