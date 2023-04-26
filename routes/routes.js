const express = require("express");
const passport = require("passport");
const UserModel = require("../model/user");

const routes = express.Router();

routes.get(
	"/login",
	passport.authenticate("login", { session: false }),
	function (req, res, next) {
		console.log(req.user);
		res.status(200).json({
			message: "authentification reussi",
			token: req.user,
		});
	}
);

routes.post("/signup", async function (req, res, next) {
	console.log(req.query);
	const user = await UserModel.findOne({ email: req.query.email });

	if (!user) {
		const userC = await UserModel.create({
			email: req.query.email,
			password: req.query.password,
		});

		if (!userC) {
			res.status(500).json("erreur interne");
		}
		res.status(201).json({
			msg: "creation reussie",
			user: userC,
		});
	} else {
		res.status(500).json("utilisateur existant");
	}
});

module.exports = routes;
