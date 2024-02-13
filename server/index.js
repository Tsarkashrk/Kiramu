import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation, loginValidation } from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserController } from './controllers/index.js';

mongoose
  .connect(
    'mongodb+srv://tokesh04:Alisher04@cluster0.ykuqhl3.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(1000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is running on port 1000');
});
