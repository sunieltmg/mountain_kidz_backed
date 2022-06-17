import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

const app = express();

//middleware
app.use(morgan('dev'));

const dbUrl =
  'mongodb+srv://mountain_kidz:mountain_kidz@cluster0.p6jj9.mongodb.net/?retryWrites=true&w=majority';
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
