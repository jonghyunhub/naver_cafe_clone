var express = require('express');
var router = express.Router();
var cafe = require('../controllers/CafeController');

router.get('/getCafelist',cafe.cafeList);

router.post('/cafeInfo',cafe.cafeInfo);

router.post('/createCafe', cafe.cafeCreate);

router.post('/findManager',cafe.cafeManger);


module.exports = router;