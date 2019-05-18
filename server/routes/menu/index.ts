import urlConfig from '../../shared/urlConfig';
import * as Koa from 'koa';

const Menu = async (ctx: Koa.BaseContext) => {
    ctx.state.data = urlConfig;
};
export default Menu;
