require('dotenv').config()
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

exports.getProfilePage = (req, res, next) => {
    console.log('req.user', req.user)
    res.status(200).json({ user: req.user })
}