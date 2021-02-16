const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
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
                        name: req.name,
                        email: email,
                        password: hashedPassword
                    })
                    return done(null, newUser)
                })
        })
        .catch(err => {
            console.log(err)
        })
}))