const configUtils = require('../../utils/common-config');

describe('index', () => {
    it('transElemText', async () => {
        const $ = () => 'Comic';
        expect(configUtils.transElemText($, '$()')).toBe('Comic');
    });

    it('replaceParams', async () => {
        const $ = () => 'Comic';
        const data = {
            params: {
                title: 'Comic',
            },
            title: '%title%',
        };
        expect(configUtils.replaceParams(data, data.title, $)).toBe('Comic');
    });

    it('getProp', async () => {
        const $ = () => 'Comic';
        const data = {
            title: 'Comic',
        };
        expect(configUtils.getProp(data, ['title'], $)).toBe('Comic');
    });

    it('all', async () => {
        const $ = () => 'Comic';
        const data = {
            params: {
                title: '$()',
            },
            title: '%title%',
        };
        expect(configUtils.getProp(data, ['title'], $)).toBe('Comic');
    });
});
