import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../index.js';
import UserSchema from '../../models/User.js';
import FavoriteSchema from '../../models/Favorite.js';

const testUser = {
  _id: new mongoose.Types.ObjectId(),
  username: 'testuser',
};
const testToken = jwt.sign({ _id: testUser._id }, process.env.JWT_SECRET);

jest.mock('../../models/User.js', () => ({
  findById: jest.fn(),
}));

jest.mock('../../models/Favorite.js', () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  findOneAndDelete: jest.fn(),
  save: jest.fn(),
}));

describe('POST api/anime/:animeCode', () => {
  it('should add a favorite anime', async () => {
    UserSchema.findById.mockResolvedValue(testUser);

    FavoriteSchema.findOne.mockResolvedValueOnce(null);

    const newFavorite = {
      animeId: '1234567890',
      animeName: 'Test Anime',
      animeCode: 'test-anime',
      animeImg: 'test.jpg',
    };

    const res = await request(app)
      .post('api/anime/:animeCode')
      .set('Authorization', `Bearer ${testToken}`)
      .send(newFavorite);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Аниме успешно добавлено в список любимых');
    expect(FavoriteSchema.save).toHaveBeenCalled();
  });

  it('should return 400 if anime is already added to favorites', async () => {
    UserSchema.findById.mockResolvedValue(testUser);

    FavoriteSchema.findOne.mockResolvedValueOnce({});

    const newFavorite = {
      animeId: '1234567890',
      animeName: 'Test Anime',
      animeCode: 'test-anime',
      animeImg: 'test.jpg',
    };

    const res = await request(app)
      .post('api/anime/:animeCode')
      .set('Authorization', `Bearer ${testToken}`)
      .send(newFavorite);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Такое аниме уже существует');
  });

});

describe('GET api/profile/favorites', () => {
  it('should get user favorites', async () => {
    UserSchema.findById.mockResolvedValue(testUser);

    const favorites = [
      {
        animeId: '1234567890',
        animeName: 'Test Anime',
        animeCode: 'test-anime',
        animeImg: 'test.jpg',
        userId: testUser._id,
      },
    ];
    FavoriteSchema.find.mockResolvedValueOnce(favorites);

    const res = await request(app)
      .get('/profile/favorites')
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].animeName).toBe('Test Anime');
  });

});

// Тесты для removeFavorite
describe('DELETE api/anime/:animeCode/', () => {
  it('should remove a favorite anime', async () => {
    UserSchema.findById.mockResolvedValue(testUser);

    FavoriteSchema.findOneAndDelete.mockResolvedValueOnce({});

    const res = await request(app)
      .delete('/anime/:animeCode')
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Аниме успешно удалено из избранного');
  });

  it('should return 404 if anime is not found in favorites', async () => {
    UserSchema.findById.mockResolvedValue(testUser);

    FavoriteSchema.findOneAndDelete.mockResolvedValueOnce(null);

    const res = await request(app)
      .delete('/anime/:animeCode')
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Аниме не найдено в избранном пользователя');
  });

});
