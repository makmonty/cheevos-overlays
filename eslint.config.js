import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  globalIgnores(['dist/*']),
  ...pluginVue.configs['flat/essential'],
  // eslintPluginPrettierRecommended,
  {
    plugins: {
      '@stylistic': stylistic,
      js,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tsParser,
      },
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-dangle': ['error', 'only-multiline'],
    },
  },
]);
