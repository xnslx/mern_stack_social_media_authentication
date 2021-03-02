const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/auth-passport');
const userController = require('../controllers/user');

router.get('/profile', passport.authenticate('jwt', { session: false }), userController.getProfilePage);


module.exports = router;