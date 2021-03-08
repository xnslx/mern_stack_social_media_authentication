require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const dbUrl = process.env.URL;
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const passport = require('passport');
const passportConfig = require('./middleware/auth-passport');
const User = require('./model/users');
const port = process.env.PORT || 3001
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(cookieParser())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// })

app.use(passport.initialize())

app.use('/', authRoute)
app.use('/user', userRoute)


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb connect successfully')
}).catch(err => {
    console.log(err)
})

app.listen(port, () => console.log(`Server started on PORT ${port}`))