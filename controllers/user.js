require('dotenv').config()
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

exports.getProfilePage = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        console.log('err', err)
        console.log('user', user)
        console.log('info', info)
        if (err || !user) {
            console.log(err)
            return res.status(404).json(info.message)
        }
        if (user) {
            res.status(200).json({ name: user.name, message: 'you log in your unique profile.' })
        }

    })(req, res, next)
}