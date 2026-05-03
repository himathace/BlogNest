const mongoose = require('mongoose');

const postdata = new mongoose.Schema({
  title: String,
  content: String,
  catogary: String,
  username: String,
});

module.exports = mongoose.model('blogdata', postdata);
