/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FormData = require('form-data');
const fetch = require('node-fetch');
const pool = require('../db/db');
require('dotenv').config();

// Customer registration

const get = (req, res) => {
  res.json({
    message: 'Hello Auth 🔐',
  });
};

const createTokenSendResponse = ({ user_id, role = 'customer' }, res, next) => {
  const payload = {
    user: user_id,
    role,
  };
  jwt.sign(
    payload,
    process.env.jwtSecret,
    {
      expiresIn: '1h',
    },
    (err, token) => {
      if (err) {
        res.status(422);
        const error = new Error('Unable to login');
        next(error);
      } else {
        res.json({ token, user_id });
      }
    }
  );
};

const register = async (req, res, next) => {
  try {
    const {
      name,
      subdomain,
      target_config_id,
      admin_email,
      admin_password,
      admin_firstname,
      admin_lastname,
      admin_phone,
      active,
    } = req.body;

    // prepare data to initialise odoo instance

    const fd = new FormData();

    fd.append('master_pwd', process.env.MPWD);
    fd.append('name', name);
    fd.append('login', admin_email);
    fd.append('password', admin_password);
    fd.append('phone', admin_phone);
    fd.append('lang', 'en_GB');
    fd.append('country_code', 'gb');

    const response = await fetch(
      'http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web/database/create',
      {
        method: 'POST',
        body: fd,
        headers: fd.getHeaders(),
      }
    );

    // encrypt password for STA database

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(admin_password, salt);

    // write into STA database

    const newUser = await pool.query(
      'INSERT INTO users (name, subdomain, target_config_id, admin_email, admin_password, admin_firstname, admin_lastname, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        name,
        subdomain,
        target_config_id,
        admin_email,
        bcryptPassword,
        admin_firstname,
        admin_lastname,
        active,
      ]
    );

    createTokenSendResponse(newUser.rows[0], res, next);
  } catch (err) {
    res.status(500);
    next(err);
  }
};

// customer login

const login = async (req, res, next) => {
  try {
    const validPassword = await bcrypt.compare(
      req.body.admin_password,
      req.foundUser.admin_password
    );

    if (validPassword) {
      createTokenSendResponse(req.foundUser, res, next);
    } else {
      res.status(422);
      throw new Error('Unable to Login');
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    next(error);
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const validPassword = await bcrypt.compare(
      req.body.admin_password,
      req.foundUser.admin_password
    );

    if (validPassword) {
      createTokenSendResponse(req.foundUser, res, next);
    } else {
      res.status(422);
      throw new Error('Unable to login');
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    next(error);
  }
};

const isVerify = async (req, res, next) => {
  try {
    if (req.user.role && req.user.role === 'admin') {
      res.json({ verified: true, admin: true });
    } else {
      res.json({ verified: true, admin: false });
    }
  } catch (error) {
    res.status(500);
    next(new Error('Server Error'));
  }
};

module.exports = {
  get,
  register,
  login,
  adminLogin,
  isVerify,
};
