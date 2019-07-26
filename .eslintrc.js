const intentSize = 2;
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  root: true,
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
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
      modules: true,
    },
    requireConfigFile: false,
    allowImportExportEverywhere: false,
  },
  rules: {
    camelcase: 'off',
    'no-restricted-syntax': 'off',
    'no-console': ['error', { allow: ['log'] }],
    'import/prefer-default-export': 'off',
    'no-await-in-loop': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': [
      'error',
    ],
    'react/jsx-uses-react': [
      'error',
    ],
    'react/jsx-uses-vars': [
      'error',
    ],
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-unused-vars': 'error',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/prefer-stateless-function': 'error',
    'react/no-array-index-key': 'error',
    'react/jsx-indent-props': ['error', intentSize],
    'react/jsx-indent': ['error', intentSize],
    indent: ['error', intentSize, { SwitchCase: 1 }],
    '@typescript-eslint/indent': ['error', intentSize, { SwitchCase: 1 }],
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'require-atomic-updates': 'off',
  },
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.ts', '.tsx', '.jsx'] } },
    react: {
      version: 'detect',
    },
  },
};
