let express = require('express');
let router = express.Router();
let blogModel = require('./../models/blogModel');

router.get('/',function(req,res,next) {
    blogModel.find().then(function (result) {
        res.render('home',{title:'home',list:result});
    }).catch();
});

router.get('/addABlog',function (req,res,next) {
    res.render('addBolg',{title:'addABlog'});
});

router.post('/api/blog',function (req,res,next) {
    //console.log(req.body);
    blogModel.create({
        title:req.body.title,
        content:req.body.content
    }).then(function (result) {
        res.redirect('/home');
    });

});

router.delete('/api/blog',function (req,res,next) {
    //console.log(req.query);
    blogModel.remove({_id:req.body.deleteId}).then(function (resu) {
        res.send({ok:1});
    }).catch(function (err) {
        res.send({ok:0})
    })
});

router.get('/api/blog',function (req,res) {
    //console.log(req.body);
    blogModel.find({_id:req.query.findId})
        .then(function (resu) {
        res.send({ok:1,list:resu[0]});
    });
});

router.put('/api/blog',function (req,res) {
    //console.log()
    blogModel.update(
        {_id:req.body.updaId},{$set:{title:req.body.title,content: req.body.content}}
        ).then(function (resu) {
        res.send(resu);
    })
});


router.get('/auto/:myId',function (req,res,next) {
    console.log(req.params.myId);

    blogModel.find({_id:req.params.myId}).then(resu=>{
        res.render('detail',{title:'detail',list:resu[0]});
    });

});





module.exports = router;