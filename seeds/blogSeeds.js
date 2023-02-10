const { blog } = require('../models');

const data = [
    {
        title: "test title",
        content: "Test Content.",
        user_id: 1
    },
    {
        title: "Test 2",
        content: "Content 2.",
        user_id: 2
    }
];

const blogs = () => blog.bulkCreate(data);

module.exports = blogs;