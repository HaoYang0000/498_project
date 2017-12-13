var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var imageSchema = mongoose.Schema({
  original_name: {type:String, unique: false},
  hashed_name: {type:String, unique: false},
  user_id: {type: String, required: true, unique: false},
  path: {type: String, required: true, unique: false},
  type:{type: String, required: true, unique: false},
  story_id:{type: String, required: false, unique: false}
});

imageSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};


module.exports = mongoose.model('Image', imageSchema);
