var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var getLeaderBoard = require('./routes/getLeaderBoard');
var setLeaderBoard = require('./routes/setLeaderBoard');

var app = express();


app.listen(process.env.PORT || 5000, () => console.log(`Example app listening on port ${5000}!`));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  next();
})
app.options('*', cors());

app.use('/leaderBoard', getLeaderBoard);
app.use('/putLeaderBoard', setLeaderBoard);

module.exports = app;
