var express = require('express');
var controller = require('./project.controller');
var comment = require('../comment/comment.controller');

var router = express.Router();

// Project Middleware
router.param('project', controller.populate);

// Comment Middleware
router.param('comment', comment.populate);

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:project', controller.get);
router.put('/:project/upvote', controller.upvote);
router.post('/:project/comments', controller.createComment);

module.exports = router;
