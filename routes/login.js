let express = require('express');
let router = express.Router();
let userModel = require('./../models/userModel');
let bcrypt = require('bcrypt');


router.get('/',function (req,res,next) {
    res.render('login',{title:"login",isShow:false});
});

router.post('/validate',function (req,res,next) {

    userModel.find({
        username : req.body.username
    }).then(function (resu) {
        if (!resu.length) {
            res.render('login',{title:"login",isShow:true});
            return;
        }

        bcrypt.compare(req.body.password, resu[0].password, function(err, resul) {
            if (resul) {
                req.session.any = resu[0];
                res.redirect('/home');
            } else {
                res.render('login',{title:"login",isShow:true});
            }
        });
    });
});


module.exports = router;