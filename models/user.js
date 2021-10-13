const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { bcryptConfig } = require('../config');
const _ = require('lodash');

const User = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    terms_agreed_at: { type: Date },
    password: { type: String },
    birth_date: { type: Date },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    reset_password_token: { type: String },
    reset_token_sent_at: { type: Date },
    verified: { type: Boolean, default: true },
    verification_token: { type: String },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
}, {
    /*toObject: {
        transform: function (doc, ret) {
            delete ret._id;
        }
    },*/
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.verification_token;
        }
    },
    timestamps: true
});

//Create password hash before saving
User.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
        return next();

    // Create verification token
    if (!user.verification_token && !user.verified) {
        let verificationToken = Math.floor(10000 + Math.random() * 90000);
        user.verification_token = verificationToken;
    }
    // generate a salt
    user.password = bcrypt.hashSync(user.password, bcryptConfig.hashRound);

    next();
});

module.exports = mongoose.model('User', User);