module.exports = {
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/downloadResult/',
        '/server/types/',
        '/server/dist/',
        '/server/logs/',
        '/server/tmp/',
    ],
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: ['**/*.{ts,tsx}'],
    bail: true,
    testURL: 'http://localhost:8080',
};
