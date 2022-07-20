import passport from "passport";

import { localStrategySignup, localStrategyLogin } from "./passport/localStrategy.js";
import jwtStrategy from "./passport/jwtStrategy.js";

passport.use('signup', localStrategySignup);
passport.use('login', localStrategyLogin);
passport.use(jwtStrategy);

export default passport