const mongoose = require('mongoose');
const utils = require('../common/utils');

const { Schema } = mongoose;

const userSchema = new Schema({
  avatar: String,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: Date,
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  country: String,
  phoneNumber: String,
  zipcode: {
    type: Number,
    min: 1000,
    max: 999999,
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        utils.validateUsername(v);
      },
      message: props => `${props.value} is not a valid username!`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: [
      {
        validator(v) {
          utils.validateEmail(v);
        },
        message: props => `${props.value} is not a valid email!`,
      },
      {
        validator(v) {
          return mongoose
            .model('User')
            .countDocuments({ email: v })
            .exec()
            .then(count => count === 0);
        },
        message: props => `${props.value} is duplicated!`,
      },
    ],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'moderator', 'user'],
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
