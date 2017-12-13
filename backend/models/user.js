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
    profile_image: {type: String, default:null},


    user_gender: {type: String, default:""},
    prefered_user_gender: {type: String, default:""},

    prefered_user_age_min: {type: Number, default:0},
    prefered_user_age_max: {type: Number, default:100},

    //pet stuff
    pet_spiecie: String,
    pet_age: Number,
    prefered_species: {type: String, default:""},
    prefered_pet_gender: {type: String, default:""},

    prefered_pet_age_min: {type: Number, default:0},
    prefered_pet_age_max: {type: Number, default:100},

    matched_users: Array,       // store list of matches
    disliked_users: Array,      // store list of users you don't like
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
