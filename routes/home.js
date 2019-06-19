let express = require('express');
let router = express.Router();

router.get('/',function(req,res,next) {
    res.render('home',{title:'home'});
});

router.get('/addABlog',function (req,res,next) {
    res.render('addBolg',{title:'addABlog'});
});

router.post('/api/add',function (req,res,next) {
    console.log(req.body);
    //连接数据库,将数据存储;
    res.render('home',{title:'home'});
});



module.exports = router;