const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please provide food name'],
    minlength: [3, 'Name must have at least 3 characters'],
    maxlength: [30, 'Name length limit is 30 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide food price'],
  },
  description: {
    type: String,
    required: [true, 'Please provide food description'],
    minlength: [5, 'Description must have at least 5 characters'],
    maxlength: [50, 'Description length limit is 50 characters'],
  },
  image: {
    type: String,
    default: '/uploads/example.jpeg',
  },
  // status: {
  //   type: String,
  //   enum: ['available', 'not available'],
  //   default: 'available',
  // },
});

module.exports = mongoose.model('Food', foodSchema);
