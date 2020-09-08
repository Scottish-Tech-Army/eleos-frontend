/* eslint-disable camelcase */
const express = require('express');

const controller = require('./auth.controller');
const middlewares = require('./auth.middlewares');
const { registerSchema, loginSchema } = require('./auth.schema');

const router = express.Router();

const defaultLoginError = 'Unable to Login';
const registrationError = 'Please pick a unique subdomain.';
const adminTable = 'admin';
const userTable = 'users';

// registering customer

router.get('/', controller.get);

router.post(
  '/register',
  middlewares.validateUser(registerSchema),
  middlewares.findUser(
    'subdomain',
    'users',
    registrationError,
    (user) => user,
    409,
  ),
  controller.register,
);

// login customer

router.post(
  '/login',
  middlewares.validateUser(loginSchema, defaultLoginError),
  middlewares.findUser(
    'admin_email',
    userTable,
    defaultLoginError,
    (user) => !(user && user.active),
  ),
  controller.login,
);

// login admin

router.post(
  '/adminlogin',
  middlewares.validateUser(loginSchema, defaultLoginError),
  middlewares.findUser(
    'admin_email',
    adminTable,
    defaultLoginError,
    (user) => !user,
  ),
  controller.login,
);

router.get('/is-verify', middlewares.isAuthorised(), controller.isVerify);

module.exports = router;
