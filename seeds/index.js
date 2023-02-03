const sequelize = require('../config/connection');
const blogs = require('./blogSeeds');
const users = require('./userSeeds');
const comments = require('./commentSeeds');

async function seedAll() {
  await sequelize.sync();
  await blogs();
  await users();
  await comments();
  process.exit(0);
};

seedAll();