const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })


const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^modules/(.*)$': '<rootDir>/modules/$1',
    '^app/(.*)$': '<rootDir>/app/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^util/(.*)$': '<rootDir>/util/$1',
    '^styles/(.*)$': '<rootDir>/styles/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ["./modules/jestReporter/out/*"],
  reporters: [
    "default", 
    "./modules/jestReporter/customReporter.js"
  ],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test|tst).[tj]s?(x)"]
}

module.exports = createJestConfig(customJestConfig)