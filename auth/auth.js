const passport = require("passport");
const jwt = require('jsonwebtoken')
const localStrategy = require("passport-local").Strategy;
const JwtStraegy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require("../model/user");
const dotenv = require('dotenv')
dotenv.config()

passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async function (email, password, done) {
			console.log(email,'hello');

			const user = await User.findOne({ email });
            console.log(user);
			try {
				if (!user) {
				
					done(null, false);
				}

				if (user) {
					const isVali = await user.comparePassword(password);
					if (isVali) {
                        const payload ={_id:user.__id,email:user.email}
                     const token =  jwt.sign(payload,process.env.SECRET_KEY)
						done(null, token);
					} else {
						done(null, false);
					}
				}
			} catch (err) {
				console.log(err);
				done(err);
			}
		}
	)
);

passport.use(new JwtStraegy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken('secret_token')
},function(payload,done){

    if(!payload){
        return done(null,fale)
    }else{
        done(null,payload)
    }

}))