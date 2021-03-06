const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String
        }
    },
    twitter: {
        id: {
            type: String
        },
        email: {
            type: String
        }
    },
    github: {
        id: {
            type: String
        },
        email: {
            type: String
        }
    },
    resetToken: String,
    resetTokenExpiration: Date
})

module.exports = mongoose.model('User', userSchema);