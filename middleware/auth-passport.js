const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/users');


module.exports = (passport) => {
    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })

    passport.deserializeUser((id, cb) => {
        User.findById(id, (err, user) => {
            if (err) { return cb(err) }
            cb(null, user)
        })
    })
    passport.use('/login', new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false
        },
        (email, password, done) => {
            User
                .findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'User not found.' });
                    }
                    bcrypt
                        .compare(password, user.password)
                        .then(isMatch => {
                            if (!isMatch) {
                                return done(null, false, { message: 'Wrong password' })
                            }
                            return done(null, user, { message: 'Log in successfully.' })
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    ));
    passport.use('/signup', new localStrategy((email, password, done) => {
        User
            .findOne({ email: email })
            .then(user => {
                if (user) {
                    return done(null, false, { message: 'This email has already been sign up' })
                }
                bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: hashedPassword
                        })
                        return done(null, user)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }))
}