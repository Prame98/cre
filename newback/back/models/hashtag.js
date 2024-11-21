const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    maxlength: 15,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Hashtag', hashtagSchema);