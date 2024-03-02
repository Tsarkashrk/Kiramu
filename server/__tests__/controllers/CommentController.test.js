import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../index.js'
import UserSchema from '../../models/User.js'
import CommentSchema from '../../models/Comment.js'

const testComment = {
  animeId: '1234567890',
  animeCode: 'anime-code',
  comment: 'Тестовый комментарий',
};

const testUser = {
  _id: new mongoose.Types.ObjectId(),
  username: 'testuser',
};

const testToken = jwt.sign({ _id: testUser._id }, process.env.JWT_SECRET);

describe('POST api/anime/:animeCode/comments', () => {
  it('should create a new comment', async () => {
    jest.spyOn(UserSchema, 'findById').mockResolvedValueOnce(testUser);

    const res = await request(app)
      .post(`api/anime/${testComment.animeCode}/comments`)
      .set('Authorization', `Bearer ${testToken}`)
      .send(testComment);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Комментарий успешно добавлен');

    const comment = await CommentSchema.findOne({ animeId: testComment.animeId });
    expect(comment).toBeTruthy();
    xpect(comment.animeId.toString()).toBe(testComment.animeId);
    expect(comment.comment).toBe(testComment.comment);
    expect(comment.userId).toEqual(testUser._id);
    expect(comment.username).toBe(testUser.username);
  });
});

describe('GET api/anime/:animeCode/comments', () => {
  it('should get comments for a specific anime', async () => {
    jest.spyOn(CommentSchema, 'find').mockResolvedValueOnce([testComment]);

    const res = await request(app).get(`/anime/${testComment.animeCode}/comments`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);

    const comment = res.body[0];
    expect(comment.animeId).toBe(testComment.animeId);
    expect(comment.comment).toBe(testComment.comment);
  });

  it('should return 404 if no comments found', async () => {
    jest.spyOn(CommentSchema, 'find').mockResolvedValueOnce([]);

    const res = await request(app).get(`api/anime/${testComment.animeCode}/comments`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Будьте первым, кто прокомментирует это аниме!');
  });
});