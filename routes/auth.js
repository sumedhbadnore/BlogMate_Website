const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


router.post('/register', async (req, res)=>{
    

    try{
        //  generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //  create new user
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword
        });

        //save user and respond
        const user = await newUser.save();
        res.render('home', {title: 'Home'});
    } catch(err){
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res)=>{
    try{
    const user = await User.findOne({email:req.body.email});
    !user && res.status(404).send("user not found")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")
    // isLoggedIn = true; 
    res.render('home', {title:"Home"});
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;