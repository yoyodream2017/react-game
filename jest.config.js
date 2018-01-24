module.exports = {
  setupFiles: ['./src/shim.js', './src/setupTests.js'],
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/shim.js',    
    '<rootDir>/src/setupTests.js',
  ],
  testRegex: 'test/.*\\.jsx?$',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/src/shim.js',
    '<rootDir>/src/setupTests.js',
  ],
  moduleFileExtensions: ['', 'json', 'js'],
  modulePaths: ['<rootDir>/src'],
}
