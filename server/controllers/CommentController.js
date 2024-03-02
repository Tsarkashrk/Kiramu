import jwt from 'jsonwebtoken';
import CommentSchema from '../models/Comment.js';
import UserSchema from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

export const postComment = async (req, res) => {
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

    if (!user.username) {
      return res.status(400).json({ message: 'Имя пользователя не найдено' });
    }

    const doc = new CommentSchema({
      animeId: req.body.animeId,
      animeCode: req.body.animeCode,
      userId,
      username: user.username,
      comment: req.body.comment,
    });

    await doc.save();

    res.status(201).json({ message: 'Комментарий успешно добавлен' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};


export const getComments = async (req, res) => {
  try {
    const { animeCode } = req.params;

    const comments = await CommentSchema.find({ animeCode });

    if (comments.length === 0) {
      return res.status(404).json({
        message: 'Будьте первым, кто прокомментирует это аниме!',
      });
    }
    
    const commentsWithCreatedAt = comments.map(comment => ({
      ...comment.toObject(), 
      createdAt: comment.createdAt.toISOString() 
    }));

    res.json(commentsWithCreatedAt);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Внутренняя ошибка сервера',
    });
  }
};