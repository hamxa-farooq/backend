import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import axios from 'axios'


export const signUpUser = async (req, res, next) => {
  res.json({
    message: 'signup successfull',
    user: req.user,
  });

};

export const loginUser = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res.status(500).send({ message: err?.message || info.message });
      } else {
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, 'TOP_SECRET');

          const _user = req.user;

          return res.json({ token, _user });
        });
      }
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
