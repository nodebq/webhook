var express = require('express');
var router = express.Router();
var hook = require('../controller/hook.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/hook', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    hook.hook(req, res);
});


module.exports = router;
