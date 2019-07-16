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
            functions: 20,
            lines: 20,
            statements: 20,
        },
    },
    bail: true,
    testURL: 'http://localhost:8080',
};
