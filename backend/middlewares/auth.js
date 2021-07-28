const jwtCheck = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwtCheck.verify(jwt, 'protected-key');
  } catch (err) {
    next(new UnauthorizedError('JWT не прошел проверку'));
  }
  req.user = payload;
  return next();
};
