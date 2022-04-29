const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: false
	},
	contact: {
		type: String,
		required: false
	},
	wallet: {
		type: Number,
		required: false
	},
	user: {
		type: String,
		required: false
	},
	age: {
		type: String,
		required: false
	},
	batch: {
		type: String,
		required: false
	},
	shop: {
		type: String,
		required: false
	},
	o_time: {
		type: String,
		required: false
	},
	c_time: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: false
	},
	date:{
		type: Date,
		required: false
	},
	count:{
		type: Number,
		required: false
	}
});
module.exports = User = mongoose.model("Users", UserSchema);