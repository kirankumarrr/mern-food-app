const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const colors = require('colors');

const passport = require('passport');
const users = require('./routes/api/user');
const restaurants = require('./routes/api/restaurants');
const cart = require('./routes/api/cart');
const order = require('./routes/api/order');

const errorHandler = require('./middlewares/error');
const app = express();

//DB config
const dbPath = require('./config/keys').mongoURI;

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middlewares
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

mongoose
  .connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log('Connected to Mongo̥DB');
  })
  .catch((err) => {
    console.error(err);
  });

// Use Routes
app.use('/api/users', users);
app.use('/api/restaurants', restaurants);
app.use('/api/cart', cart);
app.use('/api/order', order);

app.use(errorHandler);

// Server static assests if in production
if (process.env.NODE_ENV === 'production') {
  //SET Static folder
  app.use(express.static('client/build'));

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

const server = app.listen(
  port,
  console.log(`Server runnig on port  ${port}`.yellow.underline.bold)
);

//Handle unhandled promises rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  server.close(() => process.exit(1));
});
