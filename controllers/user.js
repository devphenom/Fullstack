let models = require("../models");
let bcrypt = require("bcrypt");
let passport = require("passport");
let myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
let jwt = require('jsonwebtoken');
const {isEmpty} = require('lodash')
const { validateUser} = require('../validators/signup');

exports.get_singup = function(req, res, next) {
    res.render('user/signup', { formData: {}, errors: {} });
}

exports.get_login = function(req, res, next) {
    res.render('user/login');
}

exports.signup = async function(req, res, next) {
	let errors = {};
	let generateHash = await bcrypt.hash(req.body.password, 10)
	return validateUser(errors, req).then(errors => {
		if(!isEmpty(errors)) {
			res.status(400).json(errors);
			return;
		} else {
			const newUser = models.User.build({
				email: req.body.email,
				password: generateHash
			}); 
			return newUser.save().then(result => {
				jwt.sign({user : result}, 'secretkey', (err, token) => {
					if (err) {
						return next(err)
					}
					res.json({session: token})
					return;
				})
				
			});
		}
	})
}

exports.login = function(req, res, next){
	passport.authenticate('local', (err, user) => {
		if(err) {
			return res.status(400).json({"error" : "error"}), next(err);
		}
		req.login(user, (err) => {
			if (err) {
				return next(err)
			}
			return jwt.sign({user : user}, 'secretkey', (err, token) => {
				res.json({session: token})
			});
		});
	})(req, res, next)
}
