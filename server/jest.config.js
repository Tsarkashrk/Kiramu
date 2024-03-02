export default {
  testMatch: ['**/__tests__/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['@babel/register'],
};