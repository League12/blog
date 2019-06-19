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

router.post('/api/add',function (req,res,next) {
    console.log(req.body);
    blogModel.create({
        title:req.body.title,
        content:req.body.content
    }).then(function (result) {
        res.redirect('/home')
    });

});



module.exports = router;