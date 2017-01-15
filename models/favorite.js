var mongoose = require('mongoose');

var FavoriteSchema = new mongoose.Schema({
	trainID: 		{ type: String, required: true },
	destination: 	{ type: String, required: true },
	direction: 		{ type: String, required: true },
	eventTime: 		{ type: String, required: true },
	lineName: 		{ type: String, required: true },
	nextArrival: 	{ type: String, required: true },
	station: 		{ type: String, required: true },
	waitingSeconds: { type: String, required: true },
	waitingTime: 	{ type: String, required: true }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);

