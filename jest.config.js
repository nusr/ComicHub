module.exports = {
    testPathIgnorePatterns: [
        '/node_modules/',
        '/server/',
        '/dist/',
        '/downloadResult/',
    ],
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    bail: true,
    testURL: 'http://localhost:8080',
};
