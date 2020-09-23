const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.RDS_USERNAME,
  database: 'ebdb',
  host: process.env.RDS_HOSTNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
});

module.exports = pool;
