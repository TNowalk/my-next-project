var express = require('express');
var controller = require('./comment.controller');

var router = express.Router();

// Comment Middleware
router.param('comment', controller.populate);

router.put('/:comment/upvote', controller.upvote);

module.exports = router;
