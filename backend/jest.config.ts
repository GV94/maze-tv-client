export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    collectCoverageFrom: [
        '**/*.ts',
        '!**/node_modules/**',
      ],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
};
