var Comment = require('../comment/comment.model');

// Populate a comment from a route parameter
exports.populate = function(req, res, next, id) {
  Comment.findById(id).exec(function(err, comment) {
    if (err) return next(err);
    if (!comment) {
      err = new Error('Cannot find comment');
      err.status = 404;
      return next(err);
    }
    req.comment = comment;
    return next();
  });
};

// Add an upvote to a comment
exports.upvote = function(req, res) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.status(200).json(comment);
  });
}
