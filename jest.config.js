module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@Components/(.*)$': '<rootDir>/src/components/$1',
    '^@Context/(.*)$': '<rootDir>/src/context/$1',
    '^@Core/(.*)$': '<rootDir>/src/core/$1',
    '^@Views/(.*)$': '<rootDir>/src/views/$1',
    '^@Utils/(.*)$': '<rootDir>/src/utils/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/jest.mock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Jest coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.spec.ts',
    '!src/**/*.spec.tsx',
    '!**/index.ts',
    '!**/index.tsx',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
};