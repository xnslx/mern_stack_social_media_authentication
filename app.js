require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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

// app.use(cors({
//     origin: ["http://localhost:3000", "https://polar-gorge-68331.herokuapp.com"],
//     credentials: true
// }))


app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:3000", "https://polar-gorge-68331.herokuapp.com"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});



app.use(cookieParser())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize())

app.use('/', authRoute)
app.use('/user', userRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'))
    })
}


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb connect successfully')
}).catch(err => {
    console.log(err)
})

app.listen(port, () => console.log(`Server started on PORT ${port}`))