module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["react-native/src/**/*.tsx", "common/src/**/*.tsx"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/react-native/tsconfig.json",
    },
  },
  preset: "react-native",
  rootDir: "./../",
  roots: ["<rootDir>/react-native", "<rootDir>/common"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
    "\\.js$": "<rootDir>/../node_modules/react-native/jest/preprocessor.js",
  },
};
