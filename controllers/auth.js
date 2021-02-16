require('dotenv').config()
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const bcrypt = require('bcrypt');

exports.postLogin = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err || !user) {
            console.log(err)
            return res.status(404).json(info.message)
        }
        if (user) {
            console.log('user', user)
            const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ token: token, user: user, message: 'Log in successfully.' })
        } else {
            res.status(401).json(err)
        }
    })(req, res, next)
}

exports.postSignup = (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
        console.log('err', err)
        console.log('user', user)
        console.log('info', info)
        if (err !== null || info !== undefined) {
            console.log(err)
            return res.status(404).json(info.message)
        }
        if (user) {
            res.status(201).json({ message: 'you successfully sign up!', user: user });
        } else {
            res.status(401).json(err)
        }
    })(req, res, next)

    // IF YOU DON'T USE PASSPORT-LOCAL

    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;
    // bcrypt
    //     .hash(password, 10)
    //     .then(hashedPassword => {
    //         const newUser = new User({
    //             name: name,
    //             email: email,
    //             password: hashedPassword
    //         })
    //         return newUser.save();
    //     })
    //     .then(result => {
    //         console.log('result', result)
    //         const token = jwt.sign({ id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    //         res.status(201).json({ message: 'you successfully sign up!', user: result, token: token });
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
}