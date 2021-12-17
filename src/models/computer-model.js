const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
  numID: {
    type: Number,
    required: [true, 'Please provide computer ID'],
    unique: true,
    min: [1, 'Computer ID cannot be less than 1'],
  },
  status: {
    type: String,
    enum: ['inactive', 'active', 'broken'],
    default: 'inactive',
  },
  activatedAt: Date,
  orderingFood: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

computerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'orderingFood',
    select: 'name price',
  });
  next();
});

module.exports = mongoose.model('Computer', computerSchema);
