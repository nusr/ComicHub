module.exports = {
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    // testMatch: ['**/middleware/**/*.test.ts'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/server/node_modules/',
    ],
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
