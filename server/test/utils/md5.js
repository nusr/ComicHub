const md5 = require('../../utils/md5');

describe('md5', () => {
    it('md5 Comic', async () => {
        expect(md5('Comic')).toBe('3187d745ec5983413e4f0dce3900d92d');
    });
});
