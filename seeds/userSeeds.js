const { user } = require('../models');

const data = [
  {
    userName: "test",
    email: "test@test.com",
    password: "test"
  },
  {
    userName: "RayR124",
    email: "fake@fake.com",
    password: "1234"
  },

]

const users = () => user.bulkCreate(data);

module.exports = users;