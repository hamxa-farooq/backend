import passport from 'passport';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv/config';

import express from 'express';

import _initializePassport from './config/passport.js';

import userRouter from './routes/userRouter.js';
import publicRouter from './routes/publicRouter.js';
import postRouter from './routes/postRouter.js';
import draftRouter from './routes/draft.router.js';

import connectDb from './database/connection.js';
import './database/connection.js';

connectDb();

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', publicRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/posts', postRouter);
app.use('/drafts', draftRouter);

app.listen(port, () => console.log(`server is running on port ${port}`));
