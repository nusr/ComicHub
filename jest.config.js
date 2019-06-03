module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['src/**/*.test.ts'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/server/',
        '/dist/',
        '/downloadResult/',
    ],
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: ['src/**/*.ts'],
    bail: true,
    testURL: 'http://localhost:8080',
};
