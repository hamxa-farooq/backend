import express from 'express';

import passport from 'passport';

import { signUpUser, loginUser } from '../contollers/index.js';
import validate from '../middlewares/validation.js';
import handleValidations from '../middlewares/handleValidations.js';

const router = express.Router();

router.use('/signup', passport.authenticate('signup', { session: false }), signUpUser);
router.use('/login', validate('loginUser'), handleValidations, loginUser);

export default router;
            