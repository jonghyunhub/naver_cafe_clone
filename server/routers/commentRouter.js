var express = require("express");
var router = express.Router();
var comment = require("../controllers/commentController");

router.post("/getComments", comment.getComments);

router.post("/saveComment", comment.saveComment);

router.post("/deleteComment", comment.deleteComment);

router.post("/updateComment", comment.updateComment);

module.exports = router;
