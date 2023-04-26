const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
});

UserSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

UserSchema.methods.comparePassword = async function (pass) {
	console.log(pass);
	return await bcrypt.compare(pass, this.password);
};
UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
