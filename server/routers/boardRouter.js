var express = require('express');
var router = express.Router();
var board = require('../controllers/boardController');

router.post('/getBoardList',board.getBoardList);

router.post('/createBoard',board.createBoard);

router.post('/deleteBoard', board.deleteBoard);

router.post('/updateBoard', board.updateBoard);

router.post('/getNowBoard',board.getNowBoard);

module.exports = router;