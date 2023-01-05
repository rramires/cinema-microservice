/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
     "/node_modules/",
     "logger.js"
  ],
  coverageProvider: "v8",
  coverageReporters: [
     "json",
     "text",
     "lcov",
     "clover"
  ],
  moduleDirectories: [
     "node_modules"
  ],
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  moduleNameMapper: {},
  modulePathIgnorePatterns: [],
  rootDir: '.',

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // or in package.json "test": "jest --setupFiles dotenv/config"
  setupFiles: ["dotenv/config"],
  
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ]
};
