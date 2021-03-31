require('dotenv').config()
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_APP_ID);

exports.postLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array(), type: 'validator' })
    }
    passport.authenticate('login', (err, user, info) => {
        console.log('info', info)
        console.log('postlogin', user)
        if (err || !user) {
            return res.status(403).json({ message: info.message, type: 'passport' })
        }
        if (user) {
            const token = jwt.sign({ sub: user.id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
            res.cookie('access_token', token, {
                httpOnly: true
            })
            return res.status(200).json({ message: 'Log in successfully.', user: user })
        } else {
            res.status(401).json(err)
        }
    })(req, res, next)
}

exports.postSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array(), type: 'validator' })
    }
    passport.authenticate('signup', (err, user, info) => {
        if (err !== null || info !== undefined) {
            console.log(err)
            return res.status(403).json({ message: info.message, type: 'passport' })
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


exports.getLogout = (req, res, next) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'You have successfully log out.' })
}

exports.postFindPassword = (req, res, next) => {
    const email = req.body.email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array(), type: 'validator' })
    }
    User
        .findOne({ email: req.body.email })
        .exec((err, user) => {
            console.log('err', err)
            console.log('user', user)
            if (err) {
                return res.status(404).json({ message: 'Something went wrong!' })
            } else {
                if (!user) {
                    return res.status(404).json({ message: 'Email not found!', type: 'passport' })
                } else {
                    const token = crypto.randomBytes(32).toString('hex');
                    user.resetToken = token;
                    user.resetTokenExpiration = Date.now() + 3600000;
                    return user.save((err, data) => {
                        if (err) {
                            return res.status(400).json({ message: 'Something went wrong when trying to find your email.' })
                        } else {
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
                        }
                    })
                }
            }
        })
}

// exports.postFindPassword = (req, res, next) => {
//     const email = req.body.email
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() })
//     }
//     User
//         .findOne({ email: req.body.email })
//         .then(user => {
//             console.log('user', user)
//             if (!user) {
//                 return res.status(404).json('Email not found!')
//             }
//             const token = crypto.randomBytes(32).toString('hex');
//             user.resetToken = token;
//             user.resetTokenExpiration = Date.now() + 3600000;
//             return user.save()
//         })
//         .then(result => {
//             console.log('postfindpassword', result)
//             const token = result.resetToken
//             let transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: process.env.EMAIL,
//                     pass: process.env.PASSWORD
//                 }
//             })
//             let mailOptions = {
//                 from: 'MySonAndMyDaughterShop@gmail.com',
//                 to: req.body.email,
//                 subject: 'Reset Password',
//                 html: `
//                 <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password. </p>
//             `
//             }
//             transporter.sendMail(mailOptions, (err, data) => {
//                 if (err) {
//                     return console.log('error occurs', err)
//                 }
//                 return res.status(201).json('Email sent!')
//             })
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

exports.postUpdatePassword = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array(), type: 'validator' })
    }
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const passwordToken = req.body.resetToken;
    let resetUser;
    User.findOne({ resetToken: passwordToken })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'The link has been expired. Please reset password again.', type: 'passport' })
            }
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

exports.getFacebookToken = (req, res, next) => {
    console.log('req', req)
    console.log('res', res)
}

exports.postFacebookToken = (req, res, next) => {
    console.log('postfacebooktoken', req.user)
    if (req.user) {
        const token = jwt.sign({ sub: req.user.id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
        console.log('token', token)
        res.cookie('access_token', token, {
            httpOnly: true
        })
        res.status(200).json({ user: req.user, message: 'you log in successfully' })
    }
}

// exports.getFacebookCallback = (req, res) => {
//     console.log('getFacebookCallback', req.user)
//     if (req.user) {
//         const token = jwt.sign({ sub: req.user._id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
//         res.cookie('access_token', token)
//         res.status(200).json({ message: 'you log in successfully' })
//             // res.redirect('/user/profile')
//     }
// }

exports.getSuccess = (req, res, next) => {
    res.status(200).json('success')
}

exports.getFail = (req, res, next) => {
    res.status(200).json('fail')
}

// exports.getGoogleCallback = (req, res, next) => {
//     console.log('getGoogleCallback', req.user)
//     if (req.user) {
//         const token = jwt.sign({ sub: req.user._id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
//         res.cookie('access_token', token)
//         res.redirect('/user/profile')
//     }
// }

// exports.postGoogleToken = (req, res, next) => {
//     console.log('postgoogletoken', req.user)
//     if (req.user) {
//         const token = jwt.sign({ sub: req.user.id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
//         console.log('token', token)
//         res.cookie('access_token', token)
//         res.status(200).json({ user: req.user, token: token, message: 'you log in successfully' })
//     }
// }






exports.postGoogleInfo = (req, res, next) => {
    console.log(req.body)
    const { tokenId } = req.body
    client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_APP_ID }).then(response => {
        console.log(response)
        const { email, email_verified, name, _id } = response.payload;
        if (email_verified) {
            User.findOne({ 'google.email': email }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({ message: 'Something went wrong when trying to find your email.' })
                } else {
                    if (user) {
                        const token = jwt.sign({ sub: user.id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
                        const { _id, name, email } = user;
                        res.cookie('access_token', token)
                        res.status(200).json({
                            token: token,
                            user: user,
                            message: 'A recurring google user.'
                        })
                    } else {
                        const newUser = new User({
                            name: name,
                            google: {
                                id: _id,
                                email: email
                            }
                        })
                        newUser.save((err, data) => {
                            if (err) {
                                return res.status(400).json({ message: 'Something went wrong when trying to save your data.' })
                            }
                            const token = jwt.sign({ sub: data._id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
                            const { _id, name, email } = newUser;
                            res.cookie('access_token', token, {
                                httpOnly: true
                            })
                            res.status(200).json({ user: newUser, message: 'A new google user.' })
                        })
                    }
                }
            })
        }
    })
}

exports.getTwitterCallback = (req, res, next) => {
    console.log('getTwitterCallback', req.user)
    if (req.user) {
        const token = jwt.sign({ sub: req.user._id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
        res.cookie('access_token', token)
        res.redirect('/user/profile')
    }
}

// const clientUrl = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;

let clientUrl;
if (process.env.NODE_ENV === 'production') {
    clientUrl = process.env.CLIENT_URL_PROD
} else if (process.env.NODE_ENV === 'development') {
    clientUrl = process.env.CLIENT_URL_DEV
}

console.log('clientUrl', clientUrl)


exports.getGithubCallback = (req, res, next) => {
    console.log('getGithubCallback', req.user)
    if (req.user) {
        const token = jwt.sign({ sub: req.user._id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
        res.cookie('access_token', token, {
            httpOnly: true
        })
        res.redirect(`${clientUrl}/profile`)
            // res.writeHead(302, {
            //     Location: 'http://localhost:3000/profile'
            // });
        res.end()
    }
}