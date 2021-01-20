var express = require('express');
var router = express.Router();
var User = require('../model/User');
var Note = require('../model/Note');

router.post('/info', function(req, res, next) {
  User.findOne({_id: req.body.user_id}, (err, dbres) => {
    if (dbres) {
      Note.find({
        author: req.body.user_id,
        public: true
      }, (err, noteres) => {
        return res.json({
          username: dbres.username,
          profile: dbres.profile,
          notes: noteres
        })
      })
    }
  })
});

module.exports = router;
