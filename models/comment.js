var mongoose = require("mongoose");

//Create schema

var commentSchema = mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId, //mongoose object, ObjectID
      ref: "User" //Reference another object to User object
    },
    username: String
  }
});

//create model and export it
module.exports = mongoose.model("Comment", commentSchema);
