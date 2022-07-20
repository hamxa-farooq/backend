import express from 'express';
import passport from 'passport';
import { signUpUser } from '../contollers/userController.js';
import { loginUser } from '../contollers/userController.js';

const router = express.Router();

router.use('/signup', passport.authenticate('signup', { session: false }), signUpUser);
router.use('/login', loginUser);

// router.use('/', getPosts);

export default router;
