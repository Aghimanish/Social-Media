const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');
console.log("Router Loaded");

router.get('/', homeController.home);
router.use('/users', require('./user'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
//for any further routes, access from here
//router.use('/routerName', require('./fileName'));


module.exports = router;