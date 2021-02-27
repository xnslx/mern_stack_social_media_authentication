require('dotenv').config()
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
// const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcrypt');
const User = require('../model/users');

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


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_TOKEN;
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User
        .findOne({ id: jwt_payload.sub })
        .then(user => {
            console.log('user', user)
            if (user) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'user not found.' })
            }
        })
        .catch(err => {
            console.log(err)
        })
}))


passport.use('facebook-token', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v3.0',
    profileFields: ['email', 'displayName'],
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    console.log(req)
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
    User
        .findOne({ facebookId: profile.id }, function(err, user) {
            console.log('middleware', user)
            if (err) {
                return done(err)
            } else if (user) {
                return done(null, user)
            } else {
                const newUser = new User({
                    name: profile.displayName,
                    email: profile._json.email,
                    facebookId: profile.id
                })
                newUser.save()
                return done(null, newUser)
            }
        })
        .catch(err => {
            console.log(err)
        })

}))


// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: '/facebook/callback',
//     profileFields: ['email', 'displayName']
// }, async(accessToken, refreshToken, profile, done) => {
//     console.log('accessToken', accessToken)
//     console.log('refreshToken', refreshToken)
//     console.log('profile', profile)
//     try {
//         const currentUser = User.findOne({ facebookId: profile.id })
//         if (currentUser) {
//             return done(null, currentUser)
//             console.log(currentUser)
//         }
//     } catch (err) {
//         console.log(err)
//     }
//     try {
//         const newUser = new User({
//             name: profile.displayName,
//             email: profile._json.email,
//             facebookId: profile.id
//         })
//         newUser.save()
//         return done(null, newUser)
//     } catch (err) {
//         console.log(err)
//     }
// }))