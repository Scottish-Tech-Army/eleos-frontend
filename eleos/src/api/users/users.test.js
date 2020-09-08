const request = require('supertest');
require('dotenv').config();

const { expect } = require('chai');
const app = require('../../app');
const { recreateDatabase } = require('../../common.test');

// testing admin rights

let adminToken;
let userId;
let userToken;

describe('testing admin rights with users endpoint', () => {
  before(async () => {
    await recreateDatabase();
    const user = {
      admin_email: 'eugene.nazarovs@gmail.com',
      admin_password: 'passwordpassword',
    };
    const response = await request(app).post('/auth/adminlogin').send(user);
    adminToken = response.body.token;
  });
  it('should be able to add a new user', async () => {
    const newUser = {
      name: 'Eugene',
      subdomain: 'newandfresh',
      admin_email: 'eugene.nazarovs@codeclan.com',
      target_config_id: '1',
      admin_password: 'password12345',
      admin_firstname: 'Eugene',
      admin_lastname: 'Nazarovs',
      admin_phone: '07772690728',
      active: 'true',
    };
    const response = await request(app)
      .post('/users/add')
      .set('token', adminToken)
      .send(newUser)
      .expect(200);
  });
  it('should respond with a list of all users', async () => {
    const response = await request(app)
      .get('/users')
      .set('token', adminToken)
      .expect(200);
    expect(response.body).to.have.lengthOf(1);
    userId = response.body[0].user_id;
  });
  it('should be able to edit a users details', async () => {
    const updateDetails = { target_config_id: '2' };
    const response = await request(app)
      .patch(`/users/${userId}`)
      .set('token', adminToken)
      .send(updateDetails)
      .expect(200);
    expect(response.body.target_config_id).to.equal(2);
  });
  it('should be able to delete a user', async () => {
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set('token', adminToken)
      .expect(200);
    expect(response.body).to.equal('Tenant Deleted');
  });
});

// testing that user endpoints aren't accessible with a valid non-admin jwt token

describe('testing users endpoints with the non-admin jwt token', () => {
  before(async () => {
    await recreateDatabase();
    const user = {
      admin_email: 'eugene.nazarovs@gmail.com',
      admin_password: 'passwordpassword',
    };
    const response = await request(app).post('/auth/adminlogin').send(user);
    adminToken = response.body.token;
    const newUser = {
      name: 'Eugene',
      subdomain: 'newandfresh',
      admin_email: 'eugene.nazarovs@codeclan.com',
      target_config_id: '1',
      admin_password: 'password12345',
      admin_firstname: 'Eugene',
      admin_lastname: 'Nazarovs',
      admin_phone: '07772690728',
      active: 'true',
    };
    const newResponse = await request(app)
      .post('/users/add')
      .set('token', adminToken)
      .send(newUser)
      .expect(200);
    userToken = newResponse.body.token;
    userId = newResponse.body.user_id;
  });
  it('should not respond with a list of all users', async () => {
    const response = await request(app)
      .get('/users')
      .set('token', userToken)
      .expect(401);
    expect(response.body.message).to.be.equal('Unauthorised');
  });
  it('should not be able to add a new user', async () => {
    const newUser = {
      name: 'Eugene',
      subdomain: 'excellence',
      admin_email: 'eugene.nazarovs@codeclan.com',
      target_config_id: '1',
      admin_password: 'password12345',
      admin_firstname: 'Eugene',
      admin_lastname: 'Nazarovs',
      admin_phone: '07772690728',
      active: 'true',
    };
    const response = await request(app)
      .post('/users/add')
      .set('token', userToken)
      .send(newUser)
      .expect(401);
    expect(response.body.message).to.be.equal('Unauthorised');
  });
  it('should be able to edit a users details', async () => {
    const updateDetails = { target_config_id: '2' };
    const response = await request(app)
      .patch(`/users/${userId}`)
      .set('token', userToken)
      .send(updateDetails)
      .expect(401);
    expect(response.body.message).to.be.equal('Unauthorised');
  });
  it('should be able to delete a user', async () => {
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set('token', userToken)
      .expect(401);
    expect(response.body.message).to.be.equal('Unauthorised');
  });
});
