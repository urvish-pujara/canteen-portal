var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        user: req.body.user,
        age: req.body.age,
        batch: req.body.batch,
        shop: req.body.shop,
        o_time: req.body.o_time,
        c_time: req.body.c_time,
        password: req.body.password,
        date: req.body.date,
        wallet: req.body.wallet,
        count: 0
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	User.findOne({ email }).then(user => {
        let ret = {
            user: user,
            cond: 0
        }
		// Check if user email exists
		if (!user) {
			ret.cond =2;
        }
        else{
            if(user.password != req.body.password){
                ret.cond = 1;
            }
        }
        res.send(ret);
	});
});

router.post("/profile", (req, res) => {
    
    console.log(req.body);
	User.findOneAndUpdate({ email: req.body.email },
        req.body , 
        { new: true }, 
        function(err, doc) {
            if (err) 
                return res.send(500, { error: err });
            return res.status(200).json(doc);
    }
    );
});

router.post("/money", (req, res) => {
    console.log(req.body);
	User.findOneAndUpdate({email:req.body.email},{wallet:req.body.wallet},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
});


router.post("/deduct_money", (req, res) => {
	User.findOneAndUpdate({email:req.body.email},{wallet:req.body.wallet},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
});

router.post("/refund", (req, res) => {
	User.findOneAndUpdate({email:req.body.email},{wallet:req.body.wallet},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
});

router.post("/count", (req, res) => {
    console.log(req.body);
	User.findOneAndUpdate({email:req.body.email},{count:req.body.count},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
});

module.exports = router;

