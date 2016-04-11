var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  upvotes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  creator: String
});

module.exports = mongoose.model('Project', ProjectSchema);
