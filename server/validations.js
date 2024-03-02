import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен состоять из 5 и более символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен состоять из 5 и более символов').isLength({ min: 5 }),
  body('username', 'Имя должно состоять из 2 и более символов').isLength({ min: 2 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const commentCreateValidation = [
  body('comment', 'Комментарий должен содержать хотя бы 1 символ').isLength({ min: 1 }).isString(),
];
