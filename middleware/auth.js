const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../model/users');

passport.use('login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    },
    (email, password, done) => {
        User
            .findOne({ email: email })
            .then((err, user) => {
                if (err) { return done(err) };
                if (!user) { return done(null, false, { message: 'User not found.' }); }
                if (!user.verifyPassword(password)) { return done(null, false, { message: 'Wrong password' }) };
                return done(null, user, { message: 'Log in successfully.' })
            })
            .catch(err => {
                console.log(err)
            })
    }
))