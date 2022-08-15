import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { default as courseRoutes } from './routes/api/courseRoute.js';
import { default as registerRoutes } from './routes/registerRoute.js';
import { default as authRoutes } from './routes/authRoute.js';
import { default as refreshRoutes } from './routes/refreshRoute.js';
import { default as logOutRoutes } from './routes/logOutRoute.js';
import { default as userRoutes } from './routes/api/userRoute.js';
import connectDB from './config/dbConn.js';
import verifyJWT from './middleware/verifyJWT.js';
// import redis from 'redis';
import util from 'util';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mountain Kidz API',
      version: '1.0.0',
      description: 'Simple api for school management system.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Internal staging server for testing',
      },
      {
        url: 'https://mountain-kidz.herokuapp.com/',
        description: 'Main (production) server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerJSSpec = swaggerJsdoc(swaggerOptions);

const app = express();

// redis config

// export const client = redis.createClient({
//   host: '127.0.0.1',
//   port: 6379,
//   legacyMode: true,
// });
// await client.connect();

// export const getAsync = util.promisify(client.get).bind(client);
// export const setAsync = util.promisify(client.setEx).bind(client);

//middleware
app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerJSSpec));
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
app.use('/user', userRoutes);
app.use('/course', courseRoutes);
app.use(verifyJWT);

// connect to server only after DB connection
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  // listen to server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('We are listening to your requests at port: ' + PORT);
  });
});
