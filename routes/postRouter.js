import express from 'express';

import passport from 'passport';

import { getPosts, addPost, updatePost, deletePost } from '../contollers/post.controller.js';

import validate from '../middlewares/validation.js';
import handleValidations from '../middlewares/handleValidations.js';
import authorizePost from '../middlewares/authorizePost.js';

const router = express.Router();

router.get('/:userId', passport.authenticate('jwt', {session: false}), validate('getPosts'), handleValidations, getPosts);
router.post('/', passport.authenticate('jwt', {session: false}), validate('addPost'), handleValidations, addPost);
router.put('/:id', passport.authenticate('jwt', {session: false}), validate('updatePost'), handleValidations, authorizePost('put'), updatePost);
router.delete('/:id', passport.authenticate('jwt', {session: false}), validate('deletePost'), handleValidations, authorizePost('put'), deletePost);

export default router;
