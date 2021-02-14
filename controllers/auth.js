const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

exports.postLogin = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        console.log('user', user)
        console.log('info', info)
        if (err || !user) {
            const error = new Error('An error occurred.')
                // console.log(err)
        }
        req.logIn(
            user, error => {
                if (error) {
                    console.log(error)
                    return next(error)
                }
                User
                    .findOne({ email: req.body.email })
                    .then(user => {
                        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET);
                        return res.status(201).json({ token: token, message: 'Log in successfully.' })
                    })
            }
        ).catch(err => {
            console.log(err)
        })
    })

}

exports.postSignup = (req, res, next) => {
    passport.authenticate('/signup', (err, user, info) => {
        if (err || !user) {
            const error = new Error('An error occurred.')
                // console.log(err)
        }
        console.log(user)
    })
}