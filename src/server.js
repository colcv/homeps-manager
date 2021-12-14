require('dotenv').config();
require('express-async-errors');

const app = require('./app');
const connectDb = require('./db/connect-mongodb');

const port = process.env.PORT || 3000;
const db = process.env.MONGO_URL.replace(
  '<PASSWORD>',
  process.env.MONGO_PASSWORD
);

const startServer = async () => {
  try {
    await connectDb(db);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
