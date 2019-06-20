let express = require('express');
let router = express.Router();
let blogModel = require('./../models/blogModel');
let jwt = require('jwt-simple');

router.get('/',function (req,res,next) {

    res.render('blog',{title:'blog'});

});

router.get('/blog',function (req,res,next) {

    if (req.headers["authorization"] === "") {
        res.send({ok: 0, err: "不存在token"});
        return;
    }

    let secret = "any";
    let payload = jwt.decode(req.headers["authorization"],secret);

    if(payload.exp>Date.now()){

        blogModel.find().then(result=>{

            res.send({ok:1,list:result});

        })
    }else{
        res.send({ok:0,err:"过期了"})
    }

});



module.exports = router;