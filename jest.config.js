module.exports = {
  verbose: true,
  rootDir: __dirname,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // testMatch: ['**/src/**/*.test.(ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/server/node_modules/'],
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/pages/**/*.{ts,tsx}',
    '**/utils/**/*.{ts,tsx}',
    'server/middleware/**/*.{ts,tsx}',
    'server/routes/**/*.{ts,tsx}',
    '!**/(en-US|zh-CN)/**/*.{ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/server/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss|svg)$': '<rootDir>/__mock__/jest.styleMock.js',
    '^.+\\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mock__/jest.fileMock.js',
    '~(.*)$': '<rootDir>/src$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      functions: 22,
      lines: 35,
      statements: 35,
      branches: 22,
    },
  },
  bail: true,
  testURL: 'http://localhost:8080',
};
