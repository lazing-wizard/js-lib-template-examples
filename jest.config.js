//

export default {
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  moduleDirectories: ['node_modules', '<rootDir>/source'],
  moduleNameMapper: { '^source/(.*)$': '<rootDir>/source/$1' },
  collectCoverageFrom: ['source/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '/scripts/'],
  transform: { '^.+\\.js$': 'babel-jest', '^.+\\.mjs$': 'babel-jest' },
  testEnvironment: 'node',
  verbose: true,
};
