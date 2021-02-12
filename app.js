require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const dbUrl = process.env.URL;
const port = process.env.PORT;


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb connect successfully')
}).catch(err => {
    console.log(err)
})

app.listen(port)