/* eslint-env node */

module.exports = {
  "setupFiles": [
    "./jest-setup.js"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/spec/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};
