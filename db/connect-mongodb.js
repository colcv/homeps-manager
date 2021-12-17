const mongoose = require('mongoose');

const connectDb = (url) =>
  mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

module.exports = connectDb;
