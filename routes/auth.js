const express = require('express');
const { check, body } = require('express-validator')
const router = express.Router();
const authController = require('../controllers/auth');
const passport = require('passport')

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


router.get('/facebook', authController.getFacebookPage)
router.get('/facebook/callback', authController.getFacebookCallback)

router.get('/success', authController.getSuccess)
router.get('/fail', authController.getFail)

// router.post('/auth/facebook', authController.postAuthenticateUser)



module.exports = router;