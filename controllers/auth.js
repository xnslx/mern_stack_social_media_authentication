require('dotenv').config()
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.postLogin = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err || !user) {
            return res.status(403).json(info.message)
        }
        if (user) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN, { expiresIn: '1h' });
            return res.status(201).json({ token: token, user: user, message: 'Log in successfully.' })
        } else {
            res.status(401).json(err)
        }
    })(req, res, next)
}

exports.postSignup = (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
        if (err !== null || info !== undefined) {
            console.log(err)
            return res.status(403).json(info.message)
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

exports.postFindPassword = (req, res, next) => {
    const email = req.body.email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log('user', user)
            if (!user) {
                return res.status(404).json('Email not found!')
            }
            const token = crypto.randomBytes(32).toString('hex');
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save()
        })
        .then(result => {
            console.log('postfindpassword', result)
            const token = result.resetToken
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
            let mailOptions = {
                from: 'MySonAndMyDaughterShop@gmail.com',
                to: req.body.email,
                subject: 'Reset Password',
                html: `
                <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password. </p>
            `
            }
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    return console.log('error occurs', err)
                }
                return res.status(201).json('Email sent!')
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postUpdatePassword = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    User.findOne({ resetToken: passwordToken })
        .then(user => {
            console.log('user', user)
            resetUser = user;
            return bcrypt.hash(confirmPassword, 12)
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save()
        })
        .then(() => {
            res.status(201).json({ message: 'password updated' })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getFacebookPage = (req, res, next) => {
    passport.authenticate('facebook')(req, res, next)
}

exports.getFacebookCallback = (req, res, next) => {
    passport.authenticate('facebook', {
        failureRedirect: '/fail'
    }, (err, user) => {
        console.log('err', err)
        console.log('user', user)
        if (user) {
            res.redirect('/success')
        }
    })(req, res, next)
}

exports.getSuccess = (req, res, next) => {
    res.status(200).json('success')
}

exports.getFail = (req, res, next) => {
    res.status(200).json('fail')
}

exports.postAuthenticateUser = (req, res, next) => {
    passport.authenticate('facebook-token', { session: false }, (req, res, next) => {
        console.log(req)
        console.log(res)
            // if (!req.user) {
            //     return res.status(401).json('user not authenticated')
            // } else {
            //     req.auth = {
            //         id: req.user.id
            //     }
            //     const token = jwt.sign({ id: auth.id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
            //     console.log('token', token)
            // }
    })(req, res, next)
}