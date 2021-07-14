module.exports = {
  preset: "react-native",
  transformIgnorePatterns: ["/node_modules/(?!(@react-native|react-native)/).*/"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
    "\\.js$": "<rootDir>/../../node_modules/react-native/jest/preprocessor.js",
  },
  // collectCoverage: true,
  // coveragePathIgnorePatterns: ["/node_modules/", "/test/"],
  // moduleNameMapper: {
  //   "\\.(svg)$": "<rootDir>/mock/svg-mock.tsx",
  // },
};
