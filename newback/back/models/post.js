const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  original_price: {
    type: Number,
    required: true,
  },
  discount_rate: {
    type: Number,
    required: true,
  },
  sale_end_date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ['bread', 'rice_cake', 'side_dish', 'grocery', 'etc'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);