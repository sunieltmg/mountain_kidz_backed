import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import { default as courseRoutes } from './routes/api/courseRoute.js';
import { default as registerRoutes } from './routes/registerRoute.js';
import { default as authRoutes } from './routes/authRoute.js';
import bodyParser from 'body-parser';
import connectDB from './config/dbConn.js';

const app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// connect to DB
connectDB();

// routes
app.use('/course', courseRoutes);
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);

// connect to server only after DB connection
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  // listen to server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('We are listening to your requests at port: ' + PORT);
  });
});
