var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var imageSchema = mongoose.Schema({
  original_name: String,
  hashed_name: String,
  user_id: {type: String, required: true},
  path: {type: String, required: true},
  type:{type: String, required: true}
});

imageSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


module.exports = mongoose.model('Image', imageSchema);
