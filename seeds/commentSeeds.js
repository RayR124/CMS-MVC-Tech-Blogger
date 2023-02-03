const { comment } = require('../models');

const data = [
    {
        user_id: 1,
        blog_id: 1,
        comment: "test comment."
    },
    {
        user_id: 2,
        blog_id: 2,
        comment: "test comment."
    },
];

const comments = () => comment.bulkCreate(data);

module.exports = comments;