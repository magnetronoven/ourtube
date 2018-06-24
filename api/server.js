const express = require('express');
const port = 4000;
const bodyParser = require('body-parser');
const app = express();

app.use('/', express.static('./public'));

// Body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

  next();
});

// All the routes
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/autologin', require('./routes/autologin'));

// When there's is error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});