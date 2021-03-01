const express = require('express');
const { check, body } = require('express-validator')
const router = express.Router();
const authController = require('../controllers/auth');
const passport = require('passport');
const passportConfig = require('../middleware/auth-passport');

router.post('/login', authController.postLogin)

router.post('/signup', authController.postSignup)

router.post('/findpassword', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail()
], authController.postFindPassword)

router.post('/updatepassword', [
    body('password', 'Password has to be valid')
    .isLength({ min: 5, max: 20 })
    .isAlphanumeric()
    .trim(),
    body('confirmPassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password has to be matched')
        } else {
            return true
        }
    })
], authController.postUpdatePassword)


router.get('/auth/facebook', passport.authenticate('facebook', { session: false }, { scope: ['public_profile', 'email'] }))

router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false, failureRedirect: '/login' }), authController.getFacebookCallback)

router.get('/success', authController.getSuccess)
router.get('/fail', authController.getFail)

// router.post('/auth/facebook', authController.postAuthenticateUser)



module.exports = router;