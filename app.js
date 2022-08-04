import passport from 'passport';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv/config';

import express from 'express';

import _initializePassport from './config/passport.js';

import userRouter from './routes/userRouter.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/postRouter.js';
import draftRouter from './routes/draft.router.js';
import errorHandler from './middlewares/error.handler.js';

import connectDb from './database/connection.js';
import './database/connection.js';

import cors from 'cors';
connectDb();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors('*'))
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);
app.use('/drafts', draftRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on port ${port}`));
