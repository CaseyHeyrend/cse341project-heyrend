require = require("dotenv").config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
};

module.exports = config;
