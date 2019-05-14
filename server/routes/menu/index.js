const urlConfig = require('../../shared/urlConfig');
module.exports = async (ctx) => {
    ctx.state.type = 'menu';
    ctx.state.data = urlConfig;
};
