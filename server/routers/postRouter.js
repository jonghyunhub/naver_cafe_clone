var express = require('express');
var router = express.Router();
var post = require('../controllers/postController');


router.post('/createPost',post.createPost)

router.post('/nowPost',post.nowPost)

router.post('/updatePost',post.updatePost)

module.exports = router;