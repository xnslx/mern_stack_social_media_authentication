require('dotenv').config()
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
// const GithubStrategy = require('passport-github').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
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
}, async(req, email, password, done) => {
    console.log(req.body)
    console.log(email)
    console.log(password)
    let foundUser = await User.findOne({ email: email });
    if (foundUser) {
        return done(null, false, { message: 'This email has already been taken' })
    }
    foundUser = await User.findOne({ 'facebook.email': email })
    if (foundUser) {
        foundUser.facebook.email = email
        bcrypt.hash(password, 10)
            .then(hashedPassword => {
                foundUser.email = req.body.email
                foundUser.password = hashedPassword
                foundUser.save()
                return done(null, foundUser)
            })
    }
    if (!foundUser) {
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
    }
}))

const cookieExtractor = req => {
    console.log(req.body)
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token']
        console.log('cookieextractor', token)
    }
    return token;
}

const JwtStrategy = require('passport-jwt').Strategy;
const ExtracgJwt = require('passport-jwt').ExtractJwt;

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_TOKEN,
    passReqToCallback: true
}, (req, payload, done) => {
    console.log('payload', payload)
    User
        .findById(payload.sub)
        .then(user => {
            if (!user) {
                return done(null, false)
            }
            req.user = user;
            done(null, user)
        })
        .catch(err => {
            done(err, false)
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
                    facebook: {
                        id: profile.id,
                        email: profile._json.email
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

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRECT,
    callbackURL: 'http://localhost:3001/auth/google/callback'
}, function(token, tokenSecret, profile, done) {
    console.log('token', token)
    console.log('tokenSecret', tokenSecret)
    console.log('profile', profile)
    User
        .findOne({ googleId: profile.id }, function(err, user) {
            if (err) {
                return done(err)
            } else if (user) {
                done(null, user)
            } else {
                const newUser = new User({
                    name: profile.displayName,
                    google: {
                        id: profile.id,
                        email: profile._json.email
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

passport.use('twitter', new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_SECRECT_KEY,
    callbackURL: 'http://localhost:3001/auth/twitter/callback'
}, function(token, tokenSecret, profile, done) {
    console.log('token', token)
    console.log('tokenSecret', tokenSecret)
    console.log('profile', profile)
    User
        .findOne({ twitterId: profile.id }, function(err, user) {
            if (err) {
                return done(err)
            } else if (user) {
                done(null, user)
            } else {
                const newUser = new User({
                    name: profile.displayName,
                    twitter: {
                        id: profile.id,
                        email: profile._json.email
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


passport.use('github', new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback"
}, function(accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
    User
        .findOne({ githubId: profile.id }, function(err, user) {
            console.log('user', user)
            if (err) {
                return done(err)
            } else if (user) {
                console.log('middleware', user)
                return done(null, user)
            } else {
                const newUser = new User({
                    name: profile.username,
                    github: {
                        id: profile.id,
                        email: profile._json.email
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