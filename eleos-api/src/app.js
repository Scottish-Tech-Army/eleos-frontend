/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// ROUTES

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Eleos 🌏',
  });
});

// register and login routes

app.use('/auth', require('./auth/auth.routes'));

// dashboard route

app.use('/dashboard', require('./dashboard/dashboard.routes'));

// users route

app.use('/users', require('./api/users/users.routes.js'));

// target config api

app.use('/targetconfig', require('./api/targetConfigs/targetConfig.routes.js'));

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found = ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
