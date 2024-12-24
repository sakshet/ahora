module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@Components/(.*)$': '<rootDir>/src/components/$1',
    '^@Components$': '<rootDir>/src/components',
    '^@Context/(.*)$': '<rootDir>/src/context/$1',
    '^@Context$': '<rootDir>/src/context',
    '^@Core/(.*)$': '<rootDir>/src/core/$1',
    '^@Core$': '<rootDir>/src/core',
    '^@Views/(.*)$': '<rootDir>/src/views/$1',
    '^@Views$': '<rootDir>/src/views',
    '^@Utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@Utils$': '<rootDir>/src/utils',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.spec.ts',
    '!src/**/*.spec.tsx',
    '!**/index.ts',
    '!**/index.tsx',
  ],
  coverageReporters: ['html', 'json', 'lcov', 'text', 'clover'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
};