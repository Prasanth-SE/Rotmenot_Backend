const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../../config');

function generate(user) {
  return jwt.sign(user, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn,
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, jwtConfig.secretKey, {
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
    expiresIn: jwtConfig.refreshExpiresIn
  });
}

function verifyToken(jwtToken) {
  return jwt.verify(jwtToken, jwtConfig.secretKey, {
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
    maxAge: jwtConfig.refreshExpiresIn
  });
}

function impersonatedUserToken(payload) {
  return jwt.sign(payload, jwtConfig.secretKey, {
    expiresIn: '15m',
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer
  });
}
const TokenType = {
  ID_TOKEN: 'idToken',
  REFRESH_TOKEN: 'refreshToken'
};
module.exports = { generate, generateRefreshToken, verifyToken, TokenType, impersonatedUserToken };
