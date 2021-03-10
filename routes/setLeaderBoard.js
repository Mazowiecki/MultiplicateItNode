var express = require('express');
var router = express.Router();
var DB = require('nosql');
var nosql = DB.load('./database/leaderBoard');

/* PUT leaderBoard. */
router.put('/', (req, res, next) => {
  nosql.modify({ points: req.body.points }).make((filter) => {
    filter.where('nick', req.body.nick);
    filter.callback((err, response) => {
      if (!response) {
        insertNewRow();
      } else {
        res.sendStatus(200);
      }
    });
  });

  const insertNewRow = () => {
    nosql.find().make((filter) => {
      filter.callback((err, response) => {
        nosql.insert({ "id": response.length, "nick": req.body.nick, "points": parseInt(req.body.points) });
        res.sendStatus(200);
      });
    });
  }
});

module.exports = router;
