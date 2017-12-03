var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    user_name: {type: String, unique: true},
    age: Number,
    city: String,
    state: String,
    country: String,
    pet_spiecie: String,
    prefered_species: String,
    gender: String,
    prefered_age_min: Number,
    prefered_age_max: Number
});

userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
