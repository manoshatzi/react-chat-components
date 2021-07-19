module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["react/src/**/*.tsx", "common/src/**/*.tsx"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/react/tsconfig.json",
    },
  },
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/react/mock/style-mock.ts",
    "\\.(svg)$": "<rootDir>/react/mock/svg-mock.tsx",
  },
  preset: "ts-jest",
  rootDir: "./../",
  roots: ["<rootDir>/react", "<rootDir>/common"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
  transform: { "^.+\\.(scss)$": "jest-scss-transform" },
};
