import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import app from '../../index.js';
import FavoriteSchema from '../../models/Favorite.js';
import UserSchema from '../../models/User.js';

describe('FavoriteController', () => {
  let testToken;
  let testUser;

  beforeAll(async () => {
    testUser = await UserSchema.create({
      email: 'test@example.com',
      username: 'testuser',
    });

    testToken = jwt.sign({ _id: testUser._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await UserSchema.deleteMany();
    await FavoriteSchema.deleteMany();
  });

  describe('POST /api/anime/:animeCode', () => {
    it('should add anime to favorites', async () => {
      const newFavorite = {
        animeId: '123456',
        animeName: 'Test Anime',
        animeCode: 'test-anime',
        animeImg: 'https://example.com/test-anime.jpg',
      };

      const res = await request(app)
        .post(`/api/anime/${newFavorite.animeCode}`)
        .set('Authorization', `Bearer ${testToken}`)
        .send(newFavorite)
        .expect(201);

      expect(res.body.message).toBe('Аниме успешно добавлено в список любимых');
    });
  });

  describe('GET /api/profile/favorites', () => {
    it('should get user favorites', async () => {
      const res = await request(app)
        .get('/api/profile/favorites')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('DELETE /api/anime/:animeCode', () => {
    it('should remove anime from favorites', async () => {
      const testAnimeCode = 'test-anime';

      const res = await request(app)
        .delete(`/api/anime/${testAnimeCode}`)
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200);

      expect(res.body.message).toBe('Аниме успешно удалено из избранного');
    });
  });

  describe('GET /api/anime/:animeCode/check', () => {
    it('should check favorite status', async () => {
      const testAnimeCode = 'test-anime';

      const res = await request(app)
        .get(`/api/anime/${testAnimeCode}/check`)
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200);

      expect(res.body.status).toBe('not_added');
    });
  });
});
