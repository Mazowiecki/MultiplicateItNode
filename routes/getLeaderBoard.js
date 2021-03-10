var express = require('express');
var router = express.Router();
var DB = require('nosql');
var nosql = DB.load('./database/leaderBoard');

/* GET leaderBoard. */
router.get('/', (req, res, next) => {
  nosql.find().make((filter) => {
    filter.callback((err, response) => {
      res.json({
        data: response
      });
    });
  });
});

module.exports = router;
