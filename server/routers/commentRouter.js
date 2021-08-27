var express = require("express");
var router = express.Router();
var comment = require("../controllers/commentController");

router.post("/getComments", comment.getComments);

router.post("/saveComment", comment.saveComment);

module.exports = router;
