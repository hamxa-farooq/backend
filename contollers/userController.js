import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// export const signUpUser = (req, res) => {
//     if(!req.body){
//         res.status(500).send({message: "the request body is empty"});
//     }

//     const user = new User({
//         //name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//     })

//     user.save()
//     .then((data) =>{
//         if(!data){
//             res.status(500).send({message: "User not saved"});
//         }
//         else{
//             res.status(200).send({message: "user saved in the database"});
//         }
//     })
//     .catch((err) => {
//         res.status(500).send({message: err || "Some error in database, User not saved"});
//     })

// }

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
