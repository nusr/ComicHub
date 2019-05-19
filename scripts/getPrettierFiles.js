const glob = require('glob');
const ignoreList = [
    '**/node_modules/**',
    'build/**',
    'release/**',
    '**/dist/**',
    'downloadResult/**',
    '**/logs/**',
    '**/tmp**',
];
const getPrettierFiles = () => {
    let files = [];
    const jsFiles = glob.sync('src/**/*.js*', {
        ignore: ignoreList,
    });
    const tsFiles = glob.sync('src/**/*.ts*', {
        ignore: ignoreList,
    });
    const configFiles = glob.sync('config/**/*.js*', {
        ignore: ignoreList,
    });
    const scriptFiles = glob.sync('scripts/**/*.js');
    const lessFiles = glob.sync('src/**/*.less*', {
        ignore: ignoreList,
    });
    files = files.concat(jsFiles);
    files = files.concat(tsFiles);
    files = files.concat(configFiles);
    files = files.concat(scriptFiles);
    files = files.concat(lessFiles);
    if (!files.length) {
        return;
    }
    return files;
};

module.exports = getPrettierFiles;
