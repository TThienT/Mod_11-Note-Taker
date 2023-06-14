// This code defines a router in a Node.js application using the Express framework.
// It imports the 'express' module and creates a new instance of the Router class.
const router = require('express').Router();
router.use(require('../apiRoutes/noteRoutes'));

module.exports = router;