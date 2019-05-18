import * as Koa from 'koa';
const Test = async (ctx: Koa.BaseContext) => {
    if (ctx.params.id === '0') {
        throw Error('Error test');
    }
    const item = [];

    for (let i = 1; i < 6; i++) {
        item.push({
            title: `Title${i}`,
            description: `Description${i}`,
            pubDate: new Date().toUTCString(),
        });
    }
    ctx.state.type = 'test';
    ctx.state.data = {
        title: `Test ${ctx.params.id}`,
        item: item,
    };
};
export default Test;
