var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    user_name: {type: String, unique: true},
    first_name: String,
    last_name: String,
    age: Number,
    city: String,
    state: String,
    country: String,
    address: String,

    user_gender: String,
    prefered_user_gender: String,

    prefered_user_age_min: Number,
    prefered_user_age_max: Number,

    //pet stuff
    pet_spiecie: String,
    prefered_species: String,
    prefered_pet_gender: String,

    prefered_pet_age_min: Number,
    prefered_pet_age_max: Number,

    matched_users: Array,       // store list of matches
    liked_users: Array,         // store list of users you liked
    user_stories_id: Array,     // store list of story's ids
    met_users: Array            // other users I have selected
});

userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
