const router = require('express').Router();

const apis = require('./api');
const home = require('./homeRoutes');

router.use('./', home);
router.use('./api', apis);

module.exports = router;