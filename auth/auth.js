const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/user");

passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async function (email, password, done) {
			console.log(email);

			const user = await User.findOne({ email });
			try {
				if (!user) {
					console.log(user);
					done(null, false);
				}

				if (user) {
					const isVali = await user.comparePassword(password);
					if (isVali) {
						done(null, user);
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
