const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide food name'],
    minlength: [3, 'Name must have at least 3 characters'],
    maxlength: [30, 'Name length limit is 30 characters'],
  },
  price: {
    type: String,
    required: [true, 'Please provide food price'],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        // `val` => priceDiscount value
        // `this` => current doc on NEW document creation, NOT on document update
        // => only work on CREATE and SAVE
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  },
  // status: {
  //   type: String,
  //   enum: ['available', 'not available'],
  //   default: 'available',
  // },
});

module.exports = mongoose.model('Food', foodSchema);
