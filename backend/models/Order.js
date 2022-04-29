const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const OrderSchema = new Schema({
    buyer_name: {
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
    email: {
		type: String,
		required: false
	},
	food_id: {
		type: String,
		required: false
	},
	wallet: {
		type: Number,
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
	rating: {
		type: String,
		required: false
	},
	count: {
		type: String,
		required: false
	},
	quantity: {
		type: Number,
		required: false,
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
		type: String,
		required: false
	},
    cost: {
		type: String,
		required: false
	},
    status: {
		type: String,
		required: false
	}
});
module.exports = Order = mongoose.model("Order", OrderSchema);