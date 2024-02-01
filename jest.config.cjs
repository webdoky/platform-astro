/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.mts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^unist-util-visit$': require.resolve('unist-util-visit'),
  },
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['external', 'processed-content', 'node_modules'],
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      { isolatedModules: true, useESM: true, tsconfig: './tsconfig.jest.json' },
    ],
  },
  transformIgnorePatterns: [],
};
