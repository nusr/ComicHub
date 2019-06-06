import * as Koa from 'koa';
import urlConfig from '../../shared/urlConfig';

const Menu = async (ctx: Koa.BaseContext) => {
    ctx.state.data = urlConfig;
};
export default Menu;
