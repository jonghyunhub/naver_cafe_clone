var express = require('express');
var router = express.Router();
var post = require('../controllers/postController');


router.post('/createPost',post.createPost)

module.exports = router;