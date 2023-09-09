const mongoose = require("mongoose");

// Define the user schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Create and export the model
module.exports = mongoose.model("Person", personSchema);
