const express = require('express');
const { check, body } = require('express-validator')
const router = express.Router();
const authController = require('../controllers/auth');
const passport = require('passport');
const passportConfig = require('../middleware/auth-passport');

router.post('/login', authController.postLogin)

router.post('/signup', authController.postSignup)

router.get('/logout', passport.authenticate('jwt', { session: false }), authController.getLogout)

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


router.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), authController.postFacebookToken)

// router.post('/auth/facebook/callback', passport.authenticate('facebook-token', { session: false, failureRedirect: '/login' }), authController.getFacebookCallback)

// router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), authController.getGoogleCallback)





router.post('/auth/google', authController.postGoogleInfo)

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/user/profile',
    failureRedirect: '/login'
}), authController.getTwitterCallback)

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/login',
    session: false
}), authController.getGithubCallback)

router.get('/success', authController.getSuccess)
router.get('/fail', authController.getFail)




module.exports = router;