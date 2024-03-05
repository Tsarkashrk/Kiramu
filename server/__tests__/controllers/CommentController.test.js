import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../index'; 
import CommentSchema from '../../models/Comment'; 
import UserSchema from '../../models/User';

describe('CommentController', () => {
  let testToken;
  let testUser;

  beforeAll(async () => {
    testUser = await UserSchema.create({
      username: 'testuser',
    });

    testToken = jwt.sign({ _id: testUser._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await CommentSchema.deleteMany();
    await UserSchema.deleteMany();
  });

  describe('POST /api/anime/:animeCode/comments', () => {
    it('should create a new comment', async () => {
      const testAnimeCode = 'testanimecode';
      const testComment = {
        animeId: '1234567890',
        animeCode: testAnimeCode,
        comment: 'Test comment',
      };

      const res = await request(app)
        .post(`/api/anime/${testAnimeCode}/comments`)
        .set('Authorization', `Bearer ${testToken}`)
        .send(testComment)
        .expect(201);

      expect(res.body.message).toBe('Комментарий успешно добавлен');

      const comment = await CommentSchema.findOne({ animeCode: testAnimeCode });
      expect(comment).toBeTruthy();
      expect(comment.comment).toBe(testComment.comment);
      expect(comment.userId).toEqual(testUser._id);
      expect(comment.username).toBe(testUser.username);
    });
  });

  describe('GET /api/anime/:animeCode/comments', () => {
    it('should get comments for a specific anime', async () => {
      const testAnimeCode = 'testanimecode';
      const testComment = {
        animeId: '1234567890',
        animeCode: testAnimeCode,
        comment: 'Test comment',
      };

      await CommentSchema.create(testComment);

      const res = await request(app)
        .get(`/api/anime/${testAnimeCode}/comments`)
        .expect(200);

      expect(res.body.length).toBe(1);
      expect(res.body[0].comment).toBe(testComment.comment);
    });

    it('should return 404 if no comments found', async () => {
      const testAnimeCode = 'nonexistentanimecode';

      const res = await request(app)
        .get(`/api/anime/${testAnimeCode}/comments`)
        .expect(404);

      expect(res.body.message).toBe('Будьте первым, кто прокомментирует это аниме!');
    });
  });
});
