import express from 'express';
import passport from 'passport';

import { param } from 'express-validator';

import validatePost from '../middlewares/validation.js'
import handleValidations from '../middlewares/handleValidations.js';
import authorizePost from '../middlewares/authorizePost.js';

import {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  publishDraft,
} from '../contollers/index.js';
import validate from '../middlewares/validation.js';

const router = express.Router();


router.get('/:userId', passport.authenticate('jwt', {session: false}), validatePost('getPosts'), handleValidations, authorizePost('get'), getPosts);
router.post('/', passport.authenticate('jwt', {session: false}), validatePost('addPost'), handleValidations, addPost);
router.put('/:id', passport.authenticate('jwt', {session: false}), validatePost('updatePost'), handleValidations, authorizePost('put'), updatePost);
router.delete('/:id', passport.authenticate('jwt', {session: false}), validatePost('deletePost'), handleValidations, authorizePost('put'), deletePost);
router.put('/:id/publish', validate('publishDraft'), handleValidations, authorizePost('put'), publishDraft);



export default router;
