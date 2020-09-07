/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
require('dotenv').config();

const validateUser = (validationSchema, defaultErrorMessage = '') => (
  req,
  res,
  next
) => {
  const result = validationSchema.validate(req.body);
  if (!result.error) {
    next();
  } else {
    const error = defaultErrorMessage
      ? new Error(defaultErrorMessage)
      : result.error;
    res.status(422);
    next(error || result.error);
  }
};

const findUser = (
  query,
  table,
  defaultLoginError,
  isError,
  errorCode = 422
) => async (req, res, next) => {
  try {
    const { [query]: userParam } = req.body;
    const user = await pool.query(
      // eslint-disable-next-line quotes
      `SELECT * FROM ${table} WHERE ${query} = $1`,
      [userParam]
    );
    if (isError(user.rows[0])) {
      res.status(errorCode);
      next(new Error(defaultLoginError));
    } else {
      req.foundUser = user.rows[0];
      next();
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

const unAuthorised = (res, next) => {
  const error = new Error('Unauthorised');
  res.status(401);
  next(error);
};

const isAdmin = () => (req, res, next) => {
  if (req.user.role && req.user.role === 'admin') {
    next();
  } else {
    unAuthorised(res, next);
  }
};

const isAuthorised = () => async (req, res, next) => {
  try {
    const jwtToken = req.header('token');

    if (jwtToken) {
      const payload = jwt.verify(
        jwtToken,
        process.env.jwtSecret,
        (error, user) => {
          if (error) {
            res.status(403);
            next(new Error('Not Authorised'));
          }

          req.user = user;
          next();
        }
      );
    } else {
      res.status(403);
      next(new Error('Not Authorised'));
    }
  } catch (err) {
    res.status(500);
    next(err);
  }
};

module.exports = {
  validateUser,
  findUser,
  isAuthorised,
  isAdmin,
};
