import urlConfig from '../../shared/urlConfig';
export default async function Menu(ctx) {
    ctx.state.type = 'menu';
    ctx.state.data = urlConfig;
}
