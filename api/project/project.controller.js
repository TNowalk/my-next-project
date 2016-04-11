var Project = require('./project.model');
var Comment = require('../comment/comment.model');

// Populate a project from a route parameter
exports.populate = function(req, res, next, id) {
  Project.findById(id).exec(function(err, project) {
    if (err) return next(err);
    if (!project) {
      err = new Error('Cannot find project');
      err.status = 404;
      return next(err);
    }
    req.project = project;
    return next();
  });
};

// Get all projects
exports.index = function(req, res) {
  Project.find(function(err, projects) {
    if (err) return res.send(500, err);
    return res.status(200).json(projects);
  });
};

// Creates a new project
exports.create = function(req, res) {
  Project.create(req.body, function(err, project) {
    if(err) return res.send(500, err);
    return res.status(201).json(project);
  });
};

// Retrieve a single project
exports.get = function(req, res) {
  req.project.populate('comments', function(err, project) {
    if (err) return res.send(500, err);
    return res.status(200).json(project);
  });
};

// Add an upvote a project
exports.upvote = function(req, res) {
  req.project.upvote(function(err, project) {
    if (err) return res.send(500, err);
    return res.status(200).json(project);
  });
};

// Creates a new comment on a project
exports.createComment = function(req, res) {
  // Add the project to the request body
  req.body.project = req.project;

  // Save the comment
  Comment.create(req.body, function(err, comment) {
    if (err) return res.send(500, err);

    // Add the comment to the project
    req.project.comments.push(comment);

    // Save the project
    req.project.save(function(err, project) {
      if (err) return res.send(500, err);
      return res.status(200).json(comment);
    });
  });
};
