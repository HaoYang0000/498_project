var mongoose = require('mongoose'), 
comment = require("../models/storySchema"); 

var storySchema = new mongoose.Schema({
title: String, 
author: String, 
author_id: Schema.Types.ObjectId, 
text: String, 
time: {type: Date, default:Date.now}
}); 

module.exports = mongoose.model("Story", storySchema);

