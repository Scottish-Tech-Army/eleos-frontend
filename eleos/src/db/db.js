const { Pool } = require('pg');

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  port: 5432,
  database: 'ppe_inventory',
});

module.exports = pool;
