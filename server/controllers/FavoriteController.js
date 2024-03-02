import jwt from 'jsonwebtoken';
import FavoriteSchema from '../models/Favorite.js';
import UserSchema from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

export const postFavorite = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const existingAnime = await FavoriteSchema.findOne({ animeId: req.body.animeId });

    if (existingAnime) {
      return res.status(400).json({ message: 'Такое аниме уже существует' });
    }

    const doc = new FavoriteSchema({
      animeId: req.body.animeId,
      animeName: req.body.animeName,
      animeCode: req.body.animeCode,
      animeImg: req.body.animeImg,
      userId,
    });

    await doc.save();

    res.status(201).json({ message: 'Аниме успешно добавлено в список любимых' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const favorites = await FavoriteSchema.find({ userId });

    if (favorites.length === 0) {
      return res.status(404).json({
        message: 'У этого пользователя пока нет фаворитов',
      });
    }

    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Произошла ошибка при получении фаворитов пользователя',
    });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const { animeCode } = req.params;

    const favorite = await FavoriteSchema.findOneAndDelete({ animeCode, userId });

    if (!favorite) {
      return res.status(404).json({ message: 'Аниме не найдено в избранном пользователя' });
    }

    res.status(200).json({ message: 'Аниме успешно удалено из избранного' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const checkFavoriteStatus = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const animeCode = req.params.animeCode;

    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const favorite = await FavoriteSchema.findOne({ animeCode, userId });

    if (favorite) {
      res.status(200).json({ status: 'added' });
    } else {
      res.status(404).json({ status: 'not_added' });
    }
  } catch (error) {
    console.error('Error checking favorite status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
