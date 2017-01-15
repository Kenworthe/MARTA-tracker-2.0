var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

var strategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, next){
	// Find a user with this email OR username
	User.findOne({ $or: [
		{ 'local.email': email },
		{ 'username': req.body.username }
	]},
	function(err, foundUser){
		if (err){
			return next(err);
		}
		else if (foundUser){
			if (foundUser.local.email === req.body.email){
				return next(null, false, req.flash('error', 'This email is already taken.'));
			}
			else if (foundUser.username === req.body.username){
				return next(null, false, req.flash('error', 'This username is already taken.'));
			}
			else {
				return next(null, false, req.flash('error', 'Not sure what happened...'));
			}
		}
		else {
			// Create new user if email AND username not taken.
			var newUser = new User();
			newUser.local.email = email;
			newUser.local.password = newUser.encrypt(password);
			newUser.username = req.body.username;
      // newUser.favorites = 'hello';

			newUser.save(function(err){
				return next(err, newUser);
			});
		}
	});
});

module.exports = strategy;
