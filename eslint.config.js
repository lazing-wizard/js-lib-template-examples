//

import globals from 'globals';
import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist/', 'coverage/', 'node_modules/'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      import: eslintImport,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: false }],
      'max-len': ['error', { code: 120, tabWidth: 2 }],
      semi: 'error',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-inner-declarations': 'error',
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-use-before-define': 'warn',
      'no-useless-assignment': 'error',
      'import/no-unresolved': 'error',
      'import/extensions': ['error', 'ignorePackages'],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js'],
        },
        alias: {
          map: [
            ['source', './source']
          ],
          extensions: ['.js']
        }
      }
    }
  },
  {
    files: ['source/**/*.js', 'examples/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['scripts/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['tests/**/*.test.js'],
    plugins: {
      jest: jest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
  prettier,
];
