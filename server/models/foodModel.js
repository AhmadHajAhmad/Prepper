const mongoose = require('mongoose');

// Define the food schema
const foodSchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required : true,
  },
  _userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create and export the model
module.exports = mongoose.model("Food", foodSchema);