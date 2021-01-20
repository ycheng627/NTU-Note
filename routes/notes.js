var express = require('express');
var router = express.Router();
var Note = require('../model/Note');

/* GET home page. */
router.post('/new', function(req, res, next) {
  var new_note = new Note({
    title: 'Untitled Note',
    author: req.session.user_id,
    public: true,
    content: '# Untitled Note\n',
    time_stamp: Date.now(),
    view: 0
  })

  new_note.save((err, dbres) => {
    res.json({
      success: true,
      note: dbres
    })
  })
});


router.post('/get', function(req, res, next) {
  Note.findOne({
    _id: req.body.id
  }, (err, dbres) => {
    if (!dbres || (!dbres.public && dbres.author !== req.session.user_id)) {
      return res.json({
        note: null,
      })
    }

    return res.json({
      note: dbres
    })
  })
})

router.post('/my', function(req, res, next) {
  if (!req.session.user_id) {
    return res.json({
      success: false,
      message: 'login to access notes'
    })
  }

  Note.find({
    author: req.session.user_id
  }, (err, dbres) => {
    return res.json({
      success: true,
      notes: dbres
    })
  })
})

router.post('/update', function(req, res, next) {
  if (!req.session.user_id) {
    return res.json({
      success: false,
      message: 'login to access notes'
    })
  }

  Note.findOne({
    _id: req.body.nid
  }, (err, dbres) => {
    if (req.session.user_id != dbres.author) {
      return res.json({
        success: false,
        message: 'only author can update note settings'
      })
    }

    dbres.title = req.body.title;
    dbres.public = req.body.public;
    dbres.directory = req.body.directory;
    dbres.time_stamp = Date.now();
    dbres.save((err, dbres) => {
      res.json({
        success: true,
        note: dbres
      })
    })
  })
})

router.post('/delete', function(req, res, next) {
  if (!req.session.user_id) {
    return res.json({
      success: false,
      message: 'login to delete note'
    })
  }

  Note.findOne({
    _id: req.body.nid
  }, (err, dbres) => {
    if(dbres.author != req.session.user_id){
      return res.json({
        success: false,
        message: 'only author can delete this note'
      })
    }

    Note.deleteOne({
      _id: req.body.nid
    }, (err, dbres) => {
      return res.json({
        success: true,
        message: 'deleted'
      })
    })
  })
})

router.post('/save', function(req, res, next) {
  if (!req.session.user_id) {
    return res.json({
      success: false,
      message: 'login to save note'
    })
  }

  Note.findOne({
    _id: req.body.nid
  }, (err, dbres) => {
    if (req.session.user_id != dbres.author) {
      return res.json({
        success: false,
        message: 'only author can save note'
      })
    }

    dbres.content = req.body.content
    dbres.time_stamp = Date.now()
    dbres.save((err, dbres) => {
      return res.json({
        success: true,
        note: dbres
      })
    })
  })
})

module.exports = router;
