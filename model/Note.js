const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  author: String,
  public: Boolean,
  content: String,
  time_stamp: Number,
  directory: String,
  view: Number,
  bookmarked: Boolean
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note
