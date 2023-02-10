const router = require('express').Router();

const users = require('./users.js');
const posts = require('./blog');
const comments = require('./comments');

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);

module.exports = router;