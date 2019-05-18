module.exports = {
    extends: [
        'prettier',
        'eslint-config-alloy/react',
        'eslint-config-alloy/typescript',
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true,
    },
    globals: {
        page: true,
    },
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
