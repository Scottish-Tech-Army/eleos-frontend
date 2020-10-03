/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const fetch = require('node-fetch');
const FormData = require('form-data');
const pool = require('../../db/db');

const list = async (req, res, next) => {
  try {
    const users = await pool.query(
      'SELECT user_id, name, subdomain, target_config_id, admin_email, admin_firstname, admin_lastname, active, description FROM users LEFT JOIN target_config ON users.target_config_id = target_config.target_id'
    );
    res.json(users.rows);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = {
      ...req.foundUser,
      ...req.body,
    };

    // if (req.body.admin_password) {
    //   const saltRound = 10;
    //   const salt = await bcrypt.genSalt(saltRound);

    //   const bcryptPassword = await bcrypt.hash(req.body.admin_password, salt);
    //   updatedUser.admin_password = bcryptPassword;
    // }

    const {
      user_id,
      name,
      subdomain,
      target_config_id,
      admin_email,
      admin_firstname,
      admin_lastname,
      active,
    } = updatedUser;

    const addedUser = await pool.query(
      'UPDATE users SET (name, subdomain, target_config_id, admin_email, admin_firstname, admin_lastname, active) = ($1, $2, $3, $4, $5, $6, $7) WHERE user_id = $8 RETURNING name, subdomain, target_config_id, admin_email, admin_firstname, admin_lastname, active',
      [
        name,
        subdomain,
        target_config_id,
        admin_email,
        admin_firstname,
        admin_lastname,
        active,
        user_id,
      ]
    );
    res.json(addedUser.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await pool.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING *',
      [id]
    );

    const { name } = deletedUser.rows[0];

    const fd = new FormData();

    fd.append('master_pwd', process.env.MPWD);
    fd.append('name', name);
      /*
      *
      * TEST DB: ec2-3-10-212-243
      * DEV DB : ec2-35-178-199-156
      * */ 
    await fetch(
      'http://ec2-35-178-199-156.eu-west-2.compute.amazonaws.com/web/database/drop',
      {
        method: 'POST',
        body: fd,
        headers: fd.getHeaders(),
      }
    );

    res.json('Tenant Deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  updateUser,
  deleteUser,
};
