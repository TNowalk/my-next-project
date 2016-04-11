var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  text: String,
  upvotes: {
    type: Number,
    default: 0
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  creator: String
});

module.exports = mongoose.model('Comment', CommentSchema);
