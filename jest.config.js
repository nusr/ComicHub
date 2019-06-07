module.exports = {
    testPathIgnorePatterns: [
        '/node_modules/',
        '/server/',
        '/dist/',
        '/downloadResult/',
    ],
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
    testURL: 'http://localhost:8080',
};
