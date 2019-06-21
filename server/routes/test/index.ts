import * as Koa from 'koa';

interface TestItem {
    title: string;
    description: string;
    pubDate: string;
}

const Test = async (ctx: Koa.BaseContext) => {
    if (ctx.params.id === '0') {
        throw Error('Error test');
    }
    const item: TestItem[] = [];

    for (let i = 1; i < 6; i += 1) {
        item.push({
            title: `Title${i}`,
            description: `Description${i}`,
            pubDate: new Date().toUTCString(),
        });
    }
    ctx.state.data = {
        title: `Test ${ctx.params.id}`,
        item,
    };
};
export default Test;
