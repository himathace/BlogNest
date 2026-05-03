const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase(); // clean up after tests
  }
});

describe('POST /register', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/register').send({
      inputname: 'testuser',
      inputemail: 'test@example.com',
      inputpassword: 'password123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(200);
  });

  it('should reject empty username', async () => {
    const res = await request(app).post('/register').send({
      inputname: '',
      inputemail: 'test@example.com',
      inputpassword: 'password123',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should reject short password', async () => {
    const res = await request(app).post('/register').send({
      inputname: 'testuser2',
      inputemail: 'test2@example.com',
      inputpassword: '123',
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('POST /login', () => {
  it('should login with valid credentials', async () => {
    const res = await request(app).post('/login').send({
      username: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(200);
  });

  it('should reject invalid password', async () => {
    const res = await request(app).post('/login').send({
      username: 'test@example.com',
      password: 'wrongpassword',
    });
    expect(res.statusCode).toBe(400);
  });

  it('should reject unknown email', async () => {
    const res = await request(app).post('/login').send({
      username: 'nobody@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('POST /logout', () => {
  it('should clear the cookie', async () => {
    const res = await request(app).post('/logout');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('logged out');
  });
});
