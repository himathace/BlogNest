// server/jest.config.js
module.exports = {
  testEnvironment: "node",
  testTimeout: 30000,       // give mongo time to connect
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  }
}