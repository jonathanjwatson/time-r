require("dotenv").config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');

setUserInfo = function(req){
    return {
        _id: req._id,
        email: req.email,
    }
}
generateToken = function(user){
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 10080 //in seconds
    })
}

router.post('/', function(req, res, next){
    console.log(req.body);
    console.log("Hit the login route")
    let email = req.body.email;
    // email = email.toLowerCase();
    const password = req.body.password
    console.log(email);
    User.findOne({ email: email }, function(err, foundUser) {
        if(err) { 
            console.log(err);
         }
        if(!foundUser) {
            res.status(401).json({
                error: "No user found"
            })
        } else{
            foundUser.comparePassword(password, function(err, isMatch) {
                if (err) { 
                    console.log(err)
                }
                if (!isMatch) { 
                    res.status(401).json({
                        error: "Invalid password"
                    })
                }
                if (isMatch) {
                    let userInfo = setUserInfo(foundUser);

                    let token = generateToken(userInfo)
                    foundUser.token = token;
            
                    foundUser.save(function(err, user) {
                    if (err) { return next(err); }

                    res.status(200).json({
                        user: userInfo,
                        token: user.token
                    });
                    });
                }
              });
                
        }
        
        
    });
    
});

module.exports = router;