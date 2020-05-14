var express = require('express');
var router = express.Router();

let models = require("../models");
let bcrypt = require("bcrypt");
let passport = require("passport");
let myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash')
const { validateUser} = require('../validators/signup');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { status: 'Success' });
});

var data = { data : ''};

router.post('/data', function(req, res, next) {
  data.data = req.body.email;
  req.body = data
  res.redirect('/data')
});

router.get('/data', function(req, res, next) {
  res.json(data);
});


// SIGNUP AND LOGIN ROUTES
router.get('/signup', function(req, res, next) {
  res.render('user/signup', { formData: {}, errors: {} });
})

router.get('/login', function(req, res, next) {
  res.render('user/login', { formData: {}, errors: {} });
})

router.post('/signup', async function(req, res, next) {
	let errors = {};
	let generateHash = await bcrypt.hash(req.body.password, 10)
	return validateUser(errors, req).then(errors => {
		if(!isEmpty(errors)) {
			res.json(errors);
			console.log(errors)
		} else {
			const newUser = models.User.build({
				email: req.body.email,
				password: generateHash
			}); 
			return newUser.save().then(result => {
				passport.authenticate("local", {
					successRedirect: "/login",
					failureRedirect: "/signup",
					failureFlash: true
				})(req, res, next)
			})
		}
	})
})

router.post('/login', function(req, res, next) {
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	})(req, res, next);
})



module.exports = router;
