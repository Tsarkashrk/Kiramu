import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import UserSchema from '../models/User.js';

export const register = async (req, res) => {
  try {
    const existingUser = await UserSchema.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({ message: 'Такой username уже существует' });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserSchema({
      email: req.body.email,
      username: req.body.username,
      avatarUrl: req.body.avatarUrl,
      bio: 'Заядлый Кирамчанин',
      passwordHash: hash,
    });

    const user = await doc.save();

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
};

export const login = async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;

  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Неверный логин или пароль',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(404).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      jwtSecret,
      {
        expiresIn: '5d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Не удалось авторизоваться',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Нет доступа',
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { bio } = req.body; 

    const user = await UserSchema.findByIdAndUpdate(req.userId, { bio }, { new: true });

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Произошла ошибка при обновлении профиля',
    });
  }
};