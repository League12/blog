let express = require('express');
let router = express.Router();
let blogModel = require('./../models/blogModel');
let multer  = require('multer');
let upload = multer({ dest: 'public/uploads/' });

router.get('/',function(req,res,next) {

    if (req.session.any) {
        blogModel.find().then(function (result) {
            res.render('home',{title:'home',list:result});
        }).catch();
    } else {
        res.redirect('/login');
    }
    
});

router.get('/addABlog',function (req,res,next) {
    res.render('addBolg',{title:'addABlog'});
});

router.post('/api/add',upload.single('imgpath'),function (req,res,next) {
    //console.log(req.body);
    console.log(req.file);
    blogModel.create({
        title: req.body.title,
        content: req.body.content,
        imgpath: `/uploads/${req.file.filename}`
    }).then(function (result) {
        res.redirect('/home');
    });

});

router.get('/api/delete',function (req,res,next) {
    //console.log(req.query);
    blogModel.remove({_id:req.query.deleteId}).then(function (resu) {
        res.send({ok:1});
    }).catch(function (err) {
        res.send({ok:0})
    })
});

router.post('/api/find',function (req,res) {
    //console.log(req.body);
    blogModel.find({_id:req.body.findId})
        .then(function (resu) {
        res.send({ok:1,list:resu[0]});
    });
});

router.post('/api/update',function (req,res) {
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