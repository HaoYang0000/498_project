var mongoose = require('mongoose'), 
comment = require("../models/storySchema"); 

var storySchema = new mongoose.Schema({
	title: String, 
	author: String, 
	_authorid: String, //need review 
	text: String, 
	time: {type: Date, default:Date.now},
	image_path: {type:String, default: null}
}); 

module.exports = mongoose.model("Story", storySchema);

