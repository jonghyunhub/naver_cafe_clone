var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.post('/register',user.register);

router.post('/login', user.login);

router.get('/logout', auth, user.logout);

router.get('/auth',auth, user.auth);

router.post('/findmyCafe', user.findmyCafe);

router.post('/joinCafe',user.joinCafe);

module.exports = router;