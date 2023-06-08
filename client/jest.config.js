const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@schemas$': '<rootDir>/src/schemas.ts',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@constants$': '<rootDir>/src/constants.ts',
    '^@enums$': '<rootDir>/src/enums.ts',
  }
};

module.exports = createJestConfig(customJestConfig);
