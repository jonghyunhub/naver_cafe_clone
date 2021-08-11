var express = require('express');
var router = express.Router();
var board = require('../controllers/boardController');

router.post('/getBoardList',board.getBoardList);

router.post('/createBoard',board.createBoard);

module.exports = router;