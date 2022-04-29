var express = require("express");
var router = express.Router();

const Order = require("../models/Order");

// GET request 
router.get("/", function(req, res) {
    Order.find(function(err, order) {
		if (err) {
			console.log(err);
		} else {
			res.json(order);
            // console.log(food);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
router.post("/order_food_item", (req, res) => {
    const newOrder = new Order({
        name: req.body.name,
        cost: req.body.cost,
        quantity: req.body.quantity,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        tags: req.body.tags,
        add_on: req.body.add_on,
        add_on2: req.body.add_on2,
        add_on3: req.body.add_on3,
        shop: req.body.shop,
        count: req.body.count,
        email: req.body.email,
        buyer_name: req.body.buyer_name,
        wallet: req.body.wallet,
        c_time: req.body.c_time,
        o_time: req.body.o_time,
        status: "PLACED",
        
    });

    newOrder.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/delete", (req, res) => {

    console.log(req.body);
    Food.findOneAndRemove(req.body,function(err,obj)
    {
        if (err) throw err;
        console.log(res);
    });
});


router.post("/edit_food_item", (req, res) => {
	Food.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
            return ;
        } else {
            res.json(user);
            return ;
        }
    }); 
});

router.post("/accepted", (req, res) => {
	Order.findOneAndUpdate({_id:req.body._id},{status:"ACCEPTED"},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
});

router.post("/rejected", (req, res) => {
	Order.findOneAndUpdate({_id:req.body._id},{status:"REJECTED" , wallet:req.body.wallet},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
});


router.post("/accepted_to_cooking", (req, res) => {
	Order.findOneAndUpdate({_id:req.body._id},{status:"COOKING"},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
});

router.post("/cooking_to_ready", (req, res) => {
	Order.findOneAndUpdate({_id:req.body._id},{status:"READY FOR PICKUP"},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
});


router.post("/ready_to_collected", (req, res) => {
	Order.findOneAndUpdate({_id:req.body._id},{status:"COLLECTED"},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
});

module.exports = router;

