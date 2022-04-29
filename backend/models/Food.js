const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const FoodSchema = new Schema({
	vendor_name: {
		type: String,
		required: false
	},
	c_time: {
		type: String,
		required: false
	},
	o_time: {
		type: String,
		required: false
	},
	name: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: false
	},
	sum: {
		type: Number,
		required: false
	},
	count: {
		type: Number,
		required: false
	},
	shop: {
		type: String,
		required: false
	},
	type: {
		type: String,
		required: false
	},
	add_on: {
		type: String,
		required: false
	},
	add_on2: {
		type: String,
		required: false
	},
	add_on3: {
		type: String,
		required: false
	},
	tags: {
		type: [String],
		required: false
	}
});
module.exports = Food = mongoose.model("Food", FoodSchema);