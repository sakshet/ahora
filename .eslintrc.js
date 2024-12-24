module.exports = {
  env: {
    jest: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // 'prettier/prettier': 'warn',
    'no-unused-vars': 'off', // Disable the base rule as it can report incorrect errors
    '@typescript-eslint/no-unused-vars': ['warn'], // Enable the TypeScript rule as a warning
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
  },
};