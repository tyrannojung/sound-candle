const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:@next/next/recommended', 'airbnb', 'airbnb-typescript', 'prettier'],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['.*.js', 'node_modules', '*.config.js', '*.config.mjs'],
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)'],
    },
  ],
  rules: {
    // 여기에 필요한 규칙들을 추가하세요
  },
};
