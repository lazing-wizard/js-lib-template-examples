//

import globals from 'globals';
import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-config-prettier';
import stylistic from '@stylistic/eslint-plugin';
import eslintImport from 'eslint-plugin-import';

/** @type {import('eslint').FlatConfig[]} */
export default [
  { ignores: ['**/*', '!source/**', '!examples/**', '!scripts/**', '!tests/**'] },
  js.configs.recommended,
  {
    files: ['source/**/*.js', 'examples/**/*.js', 'scripts/**/*.js', 'tests/**/*.js'],
    plugins: {
      stylistic: stylistic,
      import: eslintImport
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'always', avoidEscape: false }],
      'stylistic/max-len': ['error', { code: 120, tabWidth: 2 }],
      'stylistic/semi': 'error',
      'stylistic/indent': ["error", 2],
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
      'no-constructor-return': 'off',
      'no-duplicate-imports': 'error',
      'no-inner-declarations': 'error',
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-use-before-define': 'off',
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
