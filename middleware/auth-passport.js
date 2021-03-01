require('dotenv').config()
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcrypt');
const User = require('../model/users');
const jwt = require('jsonwebtoken');

passport.use('login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    (email, password, done) => {
        User
            .findOne({ email: email })
            .then(user => {
                console.log('user', user)
                    // if (err) { return done(err) }
                if (!user) {
                    return done(null, false, { message: 'User not found.' });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (!isMatch) {
                        return done(null, false, { message: 'Password is incorrect.' })
                    } else {
                        return done(null, user)
                    }

                })
            })
    }
));


passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
}, (req, email, password, done) => {
    console.log(req.body.name)
    console.log(email)
    console.log(password)
    let foundUser
    User
        .findOne({ email: email })
        .then(user => {
            if (user) {
                return done(null, false, { message: 'This email has already been taken' })
            }
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    const newUser = new User({
                        name: req.body.name,
                        email: email,
                        password: hashedPassword
                    })
                    newUser.save()
                    return done(null, newUser)
                })
        })
        .catch(err => {
            console.log(err)
        })
}))

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookie) {
        token = req.cookie['jwt']
    }
    return token;
}

const JwtStrategy = require('passport-jwt').Strategy;

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_TOKEN;
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('jwt_payload', jwt_payload)
    User
        .findOne({ id: jwt_payload.sub }, (err, user) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                console.log('jwt', user)
                done(null, user)
            } else {
                done(null, false)
            }
        })
}))


passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    profileFields: ['email', 'displayName'],
    callbackURL: '/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
    // console.log('middlewareFirst', req)
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
    User
        .findOne({ facebookId: profile.id }, function(err, user) {
            if (err) {
                return done(err)
            } else if (user) {
                done(null, user)
            } else {
                const newUser = new User({
                    name: profile.displayName,
                    email: profile._json.email,
                    facebook: {
                        id: profile.id
                    }
                })
                newUser.save()
                done(null, newUser)
            }
        })
        .catch(err => {
            console.log(err)
        })

}))