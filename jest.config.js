module.exports = {
    testPathIgnorePatterns: [
        '/node_modules/',
        '/server/node_modules/',
    ],
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', 'server/**/*.{ts,tsx}'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/server/node_modules/',
    ],
    coverageThreshold: {
        global: {
            functions: 15,
            lines: 25,
            statements: 25,
            branches: 25,
        },
    },
    bail: true,
    testURL: 'http://localhost:8080',
};
