const router = require('express').Router();
const pool = require('../../db/db');

router.get('/', async (req, res) => {
  try {
    const targetConfig = await pool.query('SELECT * FROM target_config');
    res.json(targetConfig.rows);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
