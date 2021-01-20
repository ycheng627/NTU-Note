var express = require('express');
var router = express.Router();
var md5 = require('md5');

const User = require('../model/User');

router.post('/signout', function(req, res, next) {
  if (req.session.user_id !== undefined){
    req.session.user_id = undefined;
    res.json({
      success: true,
      message: 'logged out'
    })
  }
})

router.post('/update', function(req, res, next) {
  User.findOne({username: req.body.username}, (err, dbres) => {
    if (dbres && dbres._id != req.body.user_id) {
      console.log(dbres._id, req.body.user_id);
      return res.json({
        success: false,
        message: 'username has been taken'
      })
    }

    User.findOne({_id: req.body.user_id}, (err, dbres) => {
      if (dbres.password != md5(req.body.password)) {
        return res.json({
          success: false,
          message: 'wrong password'
        });
      }

      dbres.username = req.body.username;
      dbres.profile = req.body.profile;

      if(req.body.new_password !== ""){
        dbres.password = md5(req.body.new_password);
      }



      dbres.save((err, dbres) => {
          res.json({
            success: true,
            user: dbres,
            message: 'successfully updated'
          })
      })
    })
  })
})

router.post('/signin', function(req, res, next) {
  const { username, password } = req.body;

  if (username === "" || password === ""){
    return res.json({
      success: false,
      message: 'username or password can\'t be blank'
    });
  }

  User.findOne({username: username}, (err, dbres) => {
    if (dbres === null) {
      return res.json({
        success: false,
        message: 'user not found'
      })
    }

    if (md5(password) === dbres.password) {
      req.session.user_id = dbres.id;
      req.session.save();

      return res.json({
        success: true,
        user: dbres
      })
    } else {
      return res.json({
        success: false,
        message: 'wrong password'
      })
    }
  })
});

router.post('/signup', function(req, res, next) {
  const { username, password } = req.body;

  if (username === "" || password === ""){
    return res.json({
      success: false,
      message: 'username or password can\'t be blank'
    });
  }

  User.findOne({
    username: req.body.username
  }, (err, dbres) => {
    if (dbres !== null) {
      return res.json({
        success: false,
        message: 'username is used'
      })
    }

    const user = new User({
      username: username,
      password: md5(password)
    })

    user.save((err, dbres) => {
      res.json({
        success: true,
        message: 'user created'
      })
    })
  })
})

router.post('/signed_in', function(req, res, next) {
  if (req.session.user_id !== undefined) {
    User.findOne({_id: req.session.user_id}, (err, dbres) => {
      return res.json({
        signed_in: true,
        user: dbres
      })
    })
  }
})

module.exports = router;
