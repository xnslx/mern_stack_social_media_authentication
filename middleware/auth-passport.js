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


// passport.use('/signup', new localStrategy((email, password, done) => {
//     User
//         .findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 return done(null, false, { message: 'This email has already been sign up' })
//             }
//             bcrypt.hash(password, 10)
//                 .then(hashedPassword => {
//                     const newUser = new User({
//                         name: name,
//                         email: email,
//                         password: hashedPassword
//                     })
//                     return done(null, user)
//                 })
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }))