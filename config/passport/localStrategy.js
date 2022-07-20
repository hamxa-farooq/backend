import passportLocal from 'passport-local';
import User from '../../models/userModel.js';

const localStrategy = passportLocal.Strategy;

export const localStrategySignup = new localStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      console.log('entered signup strategy');
      const name = req.body.name;
      const user = await User.create({ name, email, password });

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

export const localStrategyLogin = new localStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    //verify function as per documentation
    User.findOne({ email })
      .then(async (user) => {
        if (!user) {
          return done(null, false, { message: 'User not found' });
        } else {
          const isPasswordValid = await user.isValidPassword(password);
          if (!isPasswordValid) {
            return done(null, false, { message: "password didn't match" });
          } else {
            console.log('login sucessfull');
            return done(null, user, { message: 'logged in successfully' });
          }
        }
      })
      .catch((err) => {
        return done(err);
      });
  }
);
