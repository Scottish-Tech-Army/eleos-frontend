/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const bcrypt = require("bcryptjs");
const pool = require("../db/db");
require("dotenv").config();

/*
 *
 * This module populates the database with values for 'Target Config'
 * Without variables defined here, registration is not possible.
 * This will produce an error when you try and insert a value where there is already one.
 *
 */
async function createTargetConfig() {
  const con = await pool.connect();
  try {
    await con.query(
      "INSERT INTO target_config (target_id, description) VALUES (4,'Default');"
    );

    
  } finally {
    await con.release();
  }
}

createTargetConfig();
