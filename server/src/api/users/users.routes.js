const express = require('express');

require('dotenv').config();
const middlewares = require('../../auth/auth.middlewares');
const { register } = require('../../auth/auth.controller');
const { schemaNew, schemaEdit } = require('./users.schema');
const controller = require('./users.controller');
const usersMiddlewares = require('./users.middlewares');

const router = express.Router();

const registrationError = 'Please pick a unique subdomain.';

// get all users

router.get(
  '/',
  middlewares.isAuthorised(),
  middlewares.isAdmin(),
  controller.list
);
router.post(
  '/add',
  middlewares.isAuthorised(),
  middlewares.isAdmin(),
  middlewares.validateUser(schemaNew),
  middlewares.findUser(
    'subdomain',
    'users',
    registrationError,
    (user) => user,
    409
  ),
  register
);

router.patch(
  '/:id',
  middlewares.isAuthorised(),
  middlewares.isAdmin(),
  middlewares.validateUser(schemaEdit),
  usersMiddlewares.findUserById((user) => !user, 404),
  controller.updateUser
);

router.delete(
  '/:id',
  middlewares.isAuthorised(),
  middlewares.isAdmin(),
  controller.deleteUser
);

module.exports = router;
