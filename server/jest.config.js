module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: [
        'routes/**/*.ts',
        'index.ts',
        'middleware/*.ts',
        'mysql/*.ts',
        'router/*.ts',
        'service/*.ts',
        'shared/*.ts',
        'utils/*.ts',
        'type/*.ts',
    ],
    bail: true,
};
