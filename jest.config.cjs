module.exports = {
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
};
