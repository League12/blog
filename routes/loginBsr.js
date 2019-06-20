let express = require('express');
let router = express.Router();
let userModel = require('./../models/userModel');
let bcrypt = require('bcrypt');
let jwt = require('jwt-simple');

router.get('/',function (req,res,next) {
    res.render('loginBsr',{title:"loginBsr",isShow:false});
});

router.post('/blog',function (req,res,next) {

    userModel.find({
        username : req.body.username
    }).then(function (resu) {
        bcrypt.compare(req.body.password, resu[0].password, function(err, resul) {
            if (resul) {

                let secret = "any";

                let payload = {
                    username:resu[0].username,
                    exp:Date.now() + 1000 * 3600
                };

                let token = jwt.encode(payload,secret);

                res.send({ok:1,error:"",token:token})

            } else {
                res.render('loginBsr',{title:"login",isShow:true});
            }
        });
    });


});

module.exports = router;