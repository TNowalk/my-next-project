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

CommentSchema.methods.upvote = function(cb) {
  this.upvotes++;
  this.save(cb);
};

module.exports = mongoose.model('Comment', CommentSchema);
