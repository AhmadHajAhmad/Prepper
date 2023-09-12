const mongoose = require('mongoose');

// Define the house schema
const supplySchema = new mongoose.Schema({
  itemname: {
    type: String,
    required: true,
  },
  instock: {
    type: Boolean,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create and export the model
module.exports = mongoose.model("Supply", supplySchema);