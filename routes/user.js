const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');

router.get('/profile', userController.getProfilePage);


module.exports = router;