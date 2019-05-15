import urlConfig from '../../shared/urlConfig';
import * as Koa from 'koa';

const Menu = async (ctx: Koa.BaseContext) => {
  const list = Object.keys(urlConfig).map((key: string) => {
    const item: any = urlConfig[key];
    return {
      ...item,
      flag: key,
    };
  });
  ctx.state.data = list;
};
export default Menu;
