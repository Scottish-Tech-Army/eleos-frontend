const request = require('supertest');

const { expect } = require('chai');
const app = require('../app');

const newUser = {
  name: 'Eugene',
  subdomain: 'burillo',
  admin_email: 'eugene.nazarovs@codeclan.com',
  target_config_id: '1',
  admin_password: 'password12345',
  admin_firstname: 'Eugene',
  admin_lastname: 'Nazarovs',
  admin_phone: '07772690728',
  active: 'true',
};

describe('GET /', () => {
  it('should respond with a message', async () => {
    const response = await request(app).get('/auth').expect(200);
    expect(response.body.message).to.equal('Hello Auth 🔐');
  });
});

describe('POST /auth/register', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(200);
    expect(response.body).to.have.property('token');
  });
});

describe('POST /auth/register', () => {
  it('should not allow a user without organisation name', async () => {
    newUser.name = '';
    const response = await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(422);
    expect(response.body.message).to.equal('"name" is not allowed to be empty');
  });
  it('should not allow a subdomain of less than four letters', async () => {
    newUser.name = 'Eugene';
    newUser.subdomain = 'cod';
    const response = await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(422);
    expect(response.body.message).to.equal(
      '"subdomain" length must be at least 4 characters long'
    );
  });
});

describe('POST /auth/login', () => {
  it('should not be able to login with an unregistered email', async () => {
    const user = {
      admin_email: 'hello@codeclan.com',
      admin_password: 'password12345',
    };
    const response = await request(app)
      .post('/auth/login')
      .send(user)
      .expect(422);
    expect(response.body.message).to.equal('Unable to Login');
  });
  it('should not be able to login with an incorrect password', async () => {
    const user = {
      admin_email: 'eugene.nazarovs@codeclan.com',
      admin_password: 'incorrectpass123',
    };
    const response = await request(app)
      .post('/auth/login')
      .send(user)
      .expect(422);
    expect(response.body.message).to.equal('Unable to Login');
  });
  it('should be able to log in with correct credentials', async () => {
    const user = {
      admin_email: 'eugene.nazarovs@codeclan.com',
      admin_password: 'password12345',
    };
    const response = await request(app)
      .post('/auth/login')
      .send(user)
      .expect(200);
    expect(response.body).to.have.property('token');
  });
});

describe('POST /auth/adminlogin', () => {
  it('should not be able to login with valid non-admin details', async () => {
    const user = {
      admin_email: 'eugene.nazarovs@codeclan.com',
      admin_password: 'password12345',
    };
    const response = await request(app)
      .post('/auth/adminlogin')
      .send(user)
      .expect(422);
    expect(response.body.message).to.equal('Unable to Login');
  });
  it('should not be able to login with incorrect details', async () => {
    const user = {
      admin_email: 'eugene.nazarovs@gmail.com',
      admin_password: 'password1234',
    };
    const response = await request(app)
      .post('/auth/adminlogin')
      .send(user)
      .expect(422);
    expect(response.body.message).to.equal('Unable to Login');
  });
  it('can login with valid details', async () => {
    const user = {
      admin_email: 'eugene.nazarovs@gmail.com',
      admin_password: 'passwordpassword',
    };
    const response = await request(app)
      .post('/auth/adminlogin')
      .send(user)
      .expect(200);
    expect(response.body).to.have.property('token');
  });
});
