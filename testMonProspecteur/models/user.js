var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var userSchema   = new Schema({
    firstname: String,
    lastname: String,
	phone: String,
	datebirth: String,
	username: String
});
 
module.exports = mongoose.model('User', userSchema);