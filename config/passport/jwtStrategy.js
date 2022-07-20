import passportJWT from 'passport-jwt'
const ExtractJwt = passportJWT.ExtractJwt
const JWTstrategy = passportJWT.Strategy


export default new JWTstrategy(
    {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
    },
    async (token, done) => {
        try{
            return done(null, token)
        }
        catch(err){
            done(err);
        }
    }
)