module.exports = {
    testMatch: ['src/**/*.test.ts'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/server/',
        '/dist/',
        '/downloadResult/',
    ],
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: ['src/**/*.ts'],
    testURL: 'http://localhost:8080',
};
