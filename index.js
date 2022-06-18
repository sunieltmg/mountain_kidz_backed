import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

//middleware
app.use(morgan('dev'));

const dbUrl = process.env.DB_CONNECTION;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, dbOptions, () => {
  console.log('connected to db');
});

// routes
app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});

// listen to server
app.listen(3000, () => {
  console.log('We are listening to your requests at port:3000');
});
