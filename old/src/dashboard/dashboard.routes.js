/* eslint-disable camelcase */
const router = require('express').Router();
const pool = require('../db/db');
const middlewares = require('../auth/auth.middlewares');

router.get('/', middlewares.isAuthorised(), async (req, res, next) => {
  try {
    const user = await pool.query(
      'SELECT name, subdomain, admin_email, admin_firstname, admin_lastname, active FROM users WHERE user_id = $1',
      [req.user.user]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

router.patch('/edit', middlewares.isAuthorised(), async (req, res, next) => {
  try {
    const { admin_email, admin_firstname, admin_lastname } = req.body;

    const user = await pool.query(
      'UPDATE users SET (admin_email, admin_firstname, admin_lastname) = ($1, $2, $3) WHERE user_id = $4 RETURNING name, subdomain, admin_email, admin_firstname, admin_lastname, active',
      [admin_email, admin_firstname, admin_lastname, req.user.user]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
