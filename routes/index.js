var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let user = require('../controllers/user')



/* GET home page. */
router.get('/', index.get_homepage);
router.post('/data', index.post_data);
router.get('/data', index.get_data);


// SIGNUP AND LOGIN ROUTES
router.get('/users/signup', user.get_singup)
router.get('/users/login', user.get_login)
router.post('/users/signup', user.signup)
router.post('/users/login', user.login)

module.exports = router;
