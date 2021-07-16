module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/test/", "/mock/"],
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
    "\\.js$": "<rootDir>/../../node_modules/react-native/jest/preprocessor.js",
  },
};
