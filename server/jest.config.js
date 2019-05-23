module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: [
        'routes/**/*.ts',
        'middleware/*.ts',
        'sql/*.ts',
        'router/*.ts',
        'service/*.ts',
        'shared/*.ts',
        'utils/*.ts',
        'type/*.ts',
    ],
    bail: true,
};
