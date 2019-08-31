module.exports = {
  rootDir: __dirname,
  'testRunner': 'jest-circus/runner',
  'preset': 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/__mock__/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/server/node_modules/'],
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/pages/**/*.{ts,tsx}',
    '**/utils/**/*.{ts,tsx}',
    'server/middleware/**/*.{ts,tsx}',
    'server/routes/**/*.{ts,tsx}',
    '!**/type/**/*.ts',
    '!**/generateMarkdown.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/server/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss|svg)$': '<rootDir>/__mock__/jest.styleMock.js',
    '^.+\\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mock__/jest.fileMock.js',
  },
  coverageThreshold: {
    global: {
      functions: 60,
      lines: 60,
      statements: 60,
      branches: 35,
    },
  },
  testURL: 'http://localhost:8080',
};
