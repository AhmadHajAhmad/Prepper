const mongoose = require('mongoose');

// Define the water schema
const waterSchema = new mongoose.Schema({
  waterQty: {
    type: Number,
    required: true,
  
  },
  u_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
});


// Create and export the model
const Water = mongoose.model('Water', waterSchema);

module.exports = Water;

