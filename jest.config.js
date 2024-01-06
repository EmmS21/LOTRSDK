/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/commons/**",
    "!**/testProject/**",
    "!**/helpers/movieQuoteRespUtils.ts",
    "!**/helpers/movieRespUtils.ts",
    '!**/dist/**'
  ]
};