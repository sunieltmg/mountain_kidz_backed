import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import { default as courseRoutes } from './routes/api/course.js';
import bodyParser from 'body-parser';
import connectDB from './config/dbConn.js';

const app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// connect to DB
connectDB();

// routes
app.use('/course', courseRoutes);

// connect to server only after DB connection
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  // listen to server
  app.listen(3000, () => {
    console.log('We are listening to your requests at port:3000');
  });
});
