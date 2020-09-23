/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
const request = require('supertest');

const { expect } = require('chai');
const app = require('./app');
const pool = require('./db/db');

const recreateDatabase = async () => {
  try {
    await pool.query('DROP TABLE users');
    await pool.query(
      'CREATE TABLE users (user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(100) NOT NULL, subdomain VARCHAR(255) NOT NULL, target_config_id INT REFERENCES target_config(target_id), admin_email VARCHAR(255) NOT NULL, admin_password VARCHAR(255) NOT NULL, admin_firstname VARCHAR(50) NOT NULL, admin_lastname VARCHAR(50) NOT NULL, active BOOLEAN NOT NULL)'
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  recreateDatabase,
};
