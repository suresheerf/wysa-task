require('dotenv').config();

const CONFIG = {};

CONFIG.PORT = process.env.PORT || 3000;
CONFIG.NODE_ENV = process.env.NODE_ENV;
CONFIG.JWT_SECRET = process.env.JWT_SECRET;
CONFIG.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

CONFIG.DBURI = process.env.DBURI;

module.exports = CONFIG;
