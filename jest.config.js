module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!yarn-bound|@mnbroatch).+\\.js$'
  ],
  clearMocks: true
}
