require('dotenv').config()
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

exports.getProfilePage = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        console.log(err)
        console.log(user)
        console.log(info)
        if (err) {
            console.log(err)
        }
        if (info !== undefined) {
            return res.status(404).json(info.message)
        }
        if (user) {
            res.status(200).json({ name: user.name, message: 'you log in your unique profile.' })
        }

    })(req, res, next)
}