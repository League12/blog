let express = require('express');
let router = express.Router();
let userModel = require('./../models/userModel');
let bcrypt = require('bcrypt');


router.get('/',function (req,res,next) {
    res.render('register',{title:'register',isShow:false});
});

router.post('/validate',function (req,res,next) {
    // console.log(req.body);

    userModel.find({
        username: req.body.username
    }).then(result=>{
        if (result.length > 0) {
            res.render('register',{title:'register',isShow:true});
            return;
        }
    });

    bcrypt.hash(req.body.password, 10,function (err,hash) {
        userModel.create({
            username : req.body.username,
            email : req.body.email,
            password : hash
        }).then(result=>{
            res.redirect('/login');
        });
    });

});

module.exports = router;