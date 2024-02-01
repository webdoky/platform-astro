/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    // Enables global variables available in Astro components.
    node: true,
    'astro/astro': true,
    es2020: true,
  },
  extends: [
    'plugin:astro/all',
    'plugin:unicorn/all',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      extends: [
        'plugin:astro/all',
        'plugin:unicorn/all',
        'plugin:prettier/recommended',
      ],
      files: ['src/**/*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        extraFileExtensions: ['.astro'],
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'astro/no-set-html-directive': 'warn',
        'import/extensions': ['error', 'ignorePackages'],
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
          },
        ],
        'unicorn/filename-case': 'off',
        'unicorn/no-keyword-prefix': 'off',
        'unicorn/prevent-abbreviations': [
          'error',
          { allowList: { Params: true, Props: true } },
        ],
      },
    },
    {
      extends: [
        'airbnb-typescript',
        'plugin:astro/all',
        'plugin:unicorn/all',
        'plugin:prettier/recommended',
      ],
      files: ['*.tsx'],
      rules: {
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
          },
        ],
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['*.d.ts'],
      rules: {
        'unicorn/prevent-abbreviations': 'off',
      },
    },
    {
      files: ['preprocess/**/*.ts'],
      parserOptions: {
        project: './preprocess/tsconfig.json',
      },
    },
    {
      env: {
        'jest/globals': true,
      },
      extends: ['plugin:jest/recommended'],
      files: ['*.test.*'],
      plugins: ['jest'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['import', 'react', 'unicorn'],
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'unicorn/no-keyword-prefix': 'off',
  },
  settings: {
    jest: {
      version: 29,
    },
  },
};
