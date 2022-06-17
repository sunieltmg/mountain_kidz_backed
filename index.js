import express from 'express';

const app = express();

// routes
app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});

// listen to server
app.listen(3000, () => {
  console.log('We are listening to your requests at port:3000');
});
