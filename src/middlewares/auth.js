const logger = require('../config/logger');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const authenticateToken = function authenticateToken(req, res, next) {
  logger.info('checking auth');
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(httpStatus.UNAUTHORIZED);
  try {
    jwt.verify(token, config.accessToken, { algorithms: ['HS256'] });
    next();
  } catch (err) {
    logger.info('error: ' + err);
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
};

module.exports = authenticateToken;
