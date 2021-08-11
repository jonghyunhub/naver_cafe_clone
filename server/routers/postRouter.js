var express = require('express');
var router = express.Router();

router.get('/write',function(req,res){
    res.status(200).json({
        message : "write"
    })
});

module.exports = router;