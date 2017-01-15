var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

var strategy = new LocalStrategy({
	usernameField: 'emailOrUsername',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, next){
	User.findOne({ $or: [
		{ 'local.email': req.body.emailOrUsername },
		{ 'username': req.body.emailOrUsername }
  ]},
		function(err, foundUser){
			if (err){
				console.log('there was an error here!');
				return next(err);
			}
			else if (!foundUser) {
				console.log('user not found');
				return next(null, false, req.flash('error', 'User not found.'));
			}
			else if (!foundUser.isValidPassword(password)){
				console.log('wrong email or username');
				return next(null, false, req.flash('error', 'Oops! Wrong email/username or password.'));
			}
			else {
				console.log('successfully logged in!');
				return next(null, foundUser);
			}
		});
});

module.exports = strategy;
