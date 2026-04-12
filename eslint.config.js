import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: [
      '.angular/**',
      'dist/**',
      'node_modules/**',
      '.next/**',
      'out/**'
    ]
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off'
    }
  }
];
