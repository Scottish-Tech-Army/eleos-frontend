/* eslint-disable camelcase */
const pool = require('../../db/db');

const findUserById = (isError, errorCode = 422) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      id,
    ]);
    if (isError(user.rows[0])) {
      res.status(errorCode);
      next(new Error());
    } else {
      req.foundUser = user.rows[0];
      next();
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

module.exports = {
  findUserById,
};
