const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    computerID: {
      type: Number,
      required: true,
    },
    computerAmount: {
      type: Number,
      required: true,
    },
    foodAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    activatedTime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
