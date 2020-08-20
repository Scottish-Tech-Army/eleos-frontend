/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const pool = require('../db/db');
require('dotenv').config();

async function createAdminUser() {
  const client = await pool.connect();
  try {
    const admin = await client.query('SELECT * FROM admin');
    if (!admin.rows[0]) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PASSWORD,
        salt
      );
      console.log(bcryptPassword);
      const adminUser = await client.query(
        'INSERT INTO admin (admin_email, admin_password, role) VALUES ($1, $2, $3) RETURNING *',
        ['eugene.nazarovs@gmail.com', bcryptPassword, 'admin']
      );
      console.log('Admin was created');
    }
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

createAdminUser();
