import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../../index.js'; // Import your Express app instance
import UserSchema from '../../models/User.js'; // Import your User schema

describe('UserController', () => {
  let testUser;
  let testToken;

  beforeAll(async () => {
    // Create a test user for authentication
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('testpassword', salt);
    testUser = await UserSchema.create({
      email: 'test@example.com',
      username: 'testuser',
      passwordHash: hashedPassword,
    });

    // Generate a test JWT token
    testToken = jwt.sign({ _id: testUser._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    // Clean up test data after testing
    await UserSchema.deleteMany();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const newUser = {
        email: 'newuser@example.com',
        username: 'newuser',
        password: 'newuserpassword',
      };

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(200);

      // Assert response body
      expect(res.body.username).toBe(newUser.username);
      expect(res.body).not.toHaveProperty('passwordHash');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in an existing user', async () => {
      const credentials = {
        email: testUser.email,
        password: 'testpassword',
      };

      const res = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      // Assert response body
      expect(res.body.username).toBe(testUser.username);
      expect(res.body).toHaveProperty('token');
    });
  });

  describe('GET /api/profile', () => {
    it('should get user profile', async () => {
      const res = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200);

      // Assert response body
      expect(res.body.username).toBe(testUser.username);
    });
  });

  describe('PATCH /api/profile', () => {
    it('should update user profile', async () => {
      const updatedBio = 'Updated bio';

      const res = await request(app)
        .patch('/api/profile')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ bio: updatedBio })
        .expect(200);

      // Assert response body
      expect(res.body.bio).toBe(updatedBio);
    });
  });
});
