require('dotenv').config()
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const bcrypt = require('bcrypt');

exports.postLogin = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err || !user) {
            return res.status(404).json(err)
        }
        User
            .findOne({ email: req.body.email })
            .then(user => {
                console.log('user', user)
                const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET);
                return res.status(201).json({ token: token, message: 'Log in successfully.' })
            })
            .catch(err => {
                console.log(err)
                res.status(401).json(err)
            })
    })
}

exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    bcrypt
        .hash(password, 10)
        .then(hashedPassword => {
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword
            })
            return newUser.save();
        })
        .then(result => {
            console.log('result', result)
            const token = jwt.sign({ id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.status(201).json({ message: 'you successfully sign up!', user: result, token: token });
        })
        .catch(err => {
            console.log(err)
        })
}