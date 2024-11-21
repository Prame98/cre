const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    maxlength: 40,
  },
  nick: {
    type: String,
    required: true,
    maxlength: 15,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['guest', 'owner'],
    required: true,
  },
  time: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
