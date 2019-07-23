module.exports = {
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    // testMatch: ['**/middleware/**/*.test.ts'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/server/node_modules/',
    ],
    collectCoverageFrom: ['src/components/**/*.{ts,tsx}', 'src/pages/**/*.{ts,tsx}', '**/utils/**/*.{ts,tsx}', 'server/middleware/**/*.{ts,tsx}', 'server/routes/**/*.{ts,tsx}', '!**/(en-US|zh-CN)/**/*.{ts,tsx}'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/server/node_modules/',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    coverageThreshold: {
        global: {
            functions: 15,
            lines: 25,
            statements: 25,
            branches: 22,
        },
    },
    bail: true,
    testURL: 'http://localhost:8080',
};
