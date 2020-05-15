let models = require("../models");

var data = { data : 'Hello world'};

exports.get_homepage = function(req, res, next) {
	res.json({"status" : "Success"})
}
exports.post_data = function(req, res, next) {
    req.body = data.data;
    res.json(req.body)  
}
exports.get_data = function(req, res, next) {
    res.json(data);
}