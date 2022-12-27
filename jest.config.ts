import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/mocks/fileMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    'images/(.*)$': '<rootDir>/src/assets/images/$1',
  },
  transform: {
    '\\.(js|ts)?$': 'babel-jest',
  },
  // tell jest to transform axios via babel-jest
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!axios/)'],

  // test coverage
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/assets/**',
    '!<rootDir>/src/service/*',
    '!<rootDir>/src/routers/*',
    '!<rootDir>/src/utils/*',
    '!<rootDir>/src/main.tsx',
    '!<rootDir>/src/azure-storage-blob.ts',
    '!<rootDir>/src/components/common/CustomTypes.ts',
    '!<rootDir>/src/vite-env.d.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 72,
      branches: 65,
      functions: 59,
      lines: 73,
    },
  },
};

export default config;
