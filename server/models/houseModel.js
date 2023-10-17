const mongoose = require('mongoose');

// Define the house schema
const houseSchema = new mongoose.Schema({
  streetname: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model("House", houseSchema);