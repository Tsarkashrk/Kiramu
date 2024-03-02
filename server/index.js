import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation, loginValidation, commentCreateValidation } from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';
import { CommentController, UserController, FavoriteController } from './controllers/index.js';

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/profile', checkAuth, UserController.getMe);
app.get('/anime/:animeCode/comments', CommentController.getComments);
app.get('/profile/favorites', checkAuth, FavoriteController.getFavorites);
app.get('/anime/:animeCode/check', checkAuth, FavoriteController.checkFavoriteStatus);

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/anime/:animeCode/comments', checkAuth, CommentController.postComment);
app.post('/anime/:animeCode', checkAuth, FavoriteController.postFavorite);

app.patch('/profile', checkAuth, UserController.updateProfile);

app.delete('/anime/:animeCode/', checkAuth, FavoriteController.removeFavorite);

app.listen(1000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is running on port 1000');
});