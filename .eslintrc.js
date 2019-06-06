module.exports = {
    // parser: 'babel-eslint',
    parser: '@typescript-eslint/parser',
    extends: [
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/recommended',
    ], // eslint:all
    plugins: ['@typescript-eslint', 'react'],
    env: {
        commonjs: true,
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true,
    },
    parserOptions: {
        ecmaVersion: 2019,
        // ECMAScript modules 模式
        sourceType: 'module',
        ecmaFeatures: {
            // 不允许 return 语句出现在 global 环境下
            globalReturn: false,
            // 开启全局 script 模式
            impliedStrict: true,
            jsx: true,
        },
        // 即使没有 babelrc 配置文件，也使用 babel-eslint 来解析
        requireConfigFile: false,
        // 仅允许 import export 语句出现在模块的顶层
        allowImportExportEverywhere: false,
    },

    rules: {
        // '@typescript-eslint/no-unused-vars': 'off',
        indent: ['error', 4],
        /**
         * 一个缩进必须用四个空格替代
         * @category Stylistic Issues
         * @fixable
         */
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 0 }],
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
