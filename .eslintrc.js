module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'operator-linebreak': ['error', 'before']
  }
}
