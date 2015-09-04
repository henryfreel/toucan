module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'JWT Token Secret',
  MONGO_URI: process.env.MONGO_URI || 'localhost',

  // OAuth 2.0
  GITHUB_SECRET: process.env.GITHUB_SECRET || '',

  // OAuth 1.0
  TWITTER_KEY: process.env.TWITTER_KEY || '',
  TWITTER_SECRET: process.env.TWITTER_SECRET || ''
};