const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        console.log('user', user)
        console.log('info', info)
        if (err || !user) {
            const error = new Error('An error occurred.')
                // console.log(err)
        }
        req.login(
            user, error => {
                if (error) {
                    console.log(error)
                    return next(error)
                }
                const email = req.body.email;
                const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET);
                return res.status(201).json({ token: token })
            }
        ).catch(err => {
            console.log(err)
        })
    })

}