let models = require('../models');
let validator = require('validator');

const validCreateUserFields = function(errors, req) {
    if (!validator.isEmail(req.body.email)) {
        errors["error"] = "Please use a valid email.";
    }
    if (!validator.isAscii(req.body.password)) {
        errors["error"] = "Invalid Characters";
    }
    if (!validator.isLength(req.body.password, {min: 8, max: 25})) {
        errors["error"] = "Password too short, min of 8 characters and max of  25";
    }
}

exports.validateUser = function(errors, req, res) {
    return new Promise(function(resolve, reject) {
        validCreateUserFields(errors, req);
        return models.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(u => {
            if (u != null) {
                errors["error"] = "Email already in use"
                // res.json({"error" : "email already exists"})
            }
            resolve(errors);
        })
    })
}