var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Favorite = require('./favorite.js');

var UserSchema = new mongoose.Schema({
	local: {
		email: 		{ type: String, required: true },
		password: 	{ type: String, required: true }
	},
	username: 		{ type: String, required: true },
	// favorites: 		[{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }]
	favorites: 		[],

	},
	{ timestamps: true }
);

UserSchema.methods.encrypt = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

//add method to edit favorite
UserSchema.methods.addFavorite = function(cb){
	console.log('add favorites hello');
	this.favorites = ['22'];
	this.save(cb);
};

module.exports = mongoose.model('User', UserSchema);
