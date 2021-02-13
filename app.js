require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const dbUrl = process.env.URL;
const authRoute = require('./routes/auth');
const passport = require('passport');
const User = require('./model/users');

const port = process.env.PORT || 3001

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err) }
        cb(null, user)
    })
})



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize())

app.use('/', authRoute)


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb connect successfully')
}).catch(err => {
    console.log(err)
})

app.listen(port)