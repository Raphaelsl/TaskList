import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',

      globals: {
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },

    rules: {
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      camelcase: 'off',
      'no-underscore-dangle': 'off',

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: 'next',
        },
      ],
    },
  },
];