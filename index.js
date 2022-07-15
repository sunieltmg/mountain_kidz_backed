import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { default as courseRoutes } from './routes/api/courseRoute.js';
import { default as registerRoutes } from './routes/registerRoute.js';
import { default as authRoutes } from './routes/authRoute.js';
import { default as refreshRoutes } from './routes/refreshRoute.js';
import { default as logOutRoutes } from './routes/logOutRoute.js';
import connectDB from './config/dbConn.js';
import verifyJWT from './middleware/verifyJWT.js';

const app = express();

//middleware
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// connect to DB
connectDB();

// routes
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/refresh', refreshRoutes);
app.use('/logout', logOutRoutes);
app.use(verifyJWT);
app.use('/course', courseRoutes);

// connect to server only after DB connection
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  // listen to server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('We are listening to your requests at port: ' + PORT);
  });
});
