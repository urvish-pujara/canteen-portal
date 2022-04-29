var express = require("express");
var router = express.Router();

const Food = require("../models/Food");

// GET request 
router.get("/", function(req, res) {
    Food.find(function(err, food) {
		if (err) {
			console.log(err);
		} else {
			res.json(food);
            // console.log(food);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
router.post("/add_food_item", (req, res) => {
    const newFood = new Food({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        sum: 0,
        tags: req.body.tags,
        add_on: req.body.add_on,
        add_on2: req.body.add_on2,
        add_on3: req.body.add_on3,
        shop: req.body.shop,
        count: 0,
        vendor_name: req.body.vendor_name,
        c_time: req.body.c_time,
        o_time: req.body.o_time,
    });

    newFood.save()
        .then(food => {
            res.status(200).json(food);
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


router.post("/count", (req, res) => {
	Food.findOne({_id:req.body.food_id},(err,user)=>{
        user.count=user.count+1;
        user.sum=user.sum + req.body.rate;
        Food.findOneAndUpdate({_id:req.body.food_id},user,(err,user)=>{
            if(err) {
                res.status(500).json(error);
            } else {
                res.status(200).json(user);
            }
        })
        
    });
});
module.exports = router;

