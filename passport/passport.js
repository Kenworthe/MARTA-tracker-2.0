//main passport config file.

var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy = require('./local-login-strategy');
var User = require('../models/user.js');

var passportConfig = function(passport){
	// Add strategies
	passport.use('local-signup', localSignupStrategy);
	passport.use('local-login', localLoginStrategy);

	// Turn user obj into serial number
	//http://passportjs.org/docs/configure
	passport.serializeUser(function(user, callback){
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback){
		User.findById(id, function(err, user){
			callback(err, user);
		});
	});
};

module.exports = passportConfig;